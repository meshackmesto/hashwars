// frontend/src/web3/walletConnect.ts
import { HashConnect, HashConnectConnectionState } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";

// App metadata
const appMetadata = {
  name: "Hashwars",
  description: "Hashwars Web3 Battle Game",
  icons: [`${window.location.origin}/assets/icon.png`],
  url: window.location.origin,
};

// Initialize HashConnect
const hashconnect = new HashConnect(
  LedgerId.TESTNET,
  "d9c459b4a5ec8f05d5a2910bbd2a0166", // Your real ID
  appMetadata,
  false
);

// Wallet data interface
export interface WalletData {
  metadata: typeof appMetadata;
  accountId: string | null;
  connected: boolean;
  network: string;
}

// Global state
let walletData: WalletData = {
  metadata: appMetadata,
  accountId: null,
  connected: false,
  network: "testnet",
};

// === INIT ===
export async function initWalletConnect() {
  try {
    await hashconnect.init();

    // Connection status
    hashconnect.connectionStatusChangeEvent.on((state) => {
      console.log("Connection state:", state);
      walletData.connected = state === HashConnectConnectionState.Paired;
    });

    // Pairing success
    hashconnect.pairingEvent.on((session) => {
      console.log("Wallet paired:", session);
      walletData = {
        ...walletData,
        accountId: session.accountIds?.[0] || null,
        connected: true,
      };
      localStorage.setItem("hashwars_pairing", JSON.stringify(session));

      // Mint NFT on first login
      if (!localStorage.getItem("nftMinted") && session.accountIds?.[0]) {
        mintCharacterNFT(session.accountIds[0]);
      }
    });

    // Disconnection
    hashconnect.disconnectionEvent.on(() => {
      console.log("Disconnected");
      walletData = {
        ...walletData,
        accountId: null,
        connected: false,
      };
      localStorage.removeItem("hashwars_pairing");
    });

    // Restore saved session
    const saved = localStorage.getItem("hashwars_pairing");
    if (saved) {
      const session = JSON.parse(saved);
      walletData.accountId = session.accountIds?.[0] || null;
      walletData.connected = true;
    } else {
      await hashconnect.openPairingModal();
    }

    return walletData;
  } catch (err) {
    console.error("Wallet init error:", err);
    throw new Error("Failed to connect wallet. Install HashPack.");
  }
}

// === MINT NFT ===
export async function mintCharacterNFT(accountId: string) {
  try {
    const res = await fetch("/api/mintCharacterNFT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    });
    if (res.ok) {
      localStorage.setItem("nftMinted", "true");
      console.log("NFT minted for", accountId);
    }
  } catch (err) {
    console.error("NFT mint error:", err);
  }
}

// === DISCONNECT (FIXED) ===
export async function disconnectWallet() {
  try {
    await hashconnect.disconnect();
    localStorage.removeItem("hashwars_pairing");
    localStorage.removeItem("nftMinted");

    // UPDATE STATE
    walletData = {
      ...walletData,
      accountId: null,
      connected: false,
    };

    console.log("Disconnected and state cleared");
  } catch (err) {
    console.error("Disconnect error:", err);
  }
}

// === GETTER ===
export function getWalletData() {
  return walletData;
}