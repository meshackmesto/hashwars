// src/App.tsx
import { useEffect, useState } from "react";
import { initWalletConnect, getWalletData } from "./web3/walletConnect";
import HomeScreen from "./scenes/Home";
import type { WalletData } from "./web3/walletConnect";

function App() {
  const [wallet, setWallet] = useState<WalletData | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initWalletConnect();
        setWallet(getWalletData());
      } catch (err) {
        console.error("Wallet init failed:", err);
        setWallet(null); // Still show UI
      }
    };
    init();
  }, []);

  return (
    <div className="App">
      <HomeScreen wallet={wallet} />
    </div>
  );
}

export default App;