// src/scenes/HomeScene.ts
import Phaser from "phaser";
import { disconnectWallet } from "../web3/walletConnect";
import type { WalletData } from "../web3/walletConnect";

export default class HomeScene extends Phaser.Scene {
  private wallet!: WalletData | { connected: false; accountId: string };

  constructor() {
    super("Home");
  }

  init(data: { wallet?: WalletData }) {
    this.wallet = data.wallet ?? { connected: false, accountId: "" };
  }

  preload() {
    this.load.image("background", "assets/background/jungle.png");
  }

  create() {
    // Background
    this.add.image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);

    // Title
    this.add.text(this.scale.width / 2, 100, "Hashwars", {
      font: "48px Comic Sans MS",
      color: "#FFF",
      stroke: "#000",
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Buttons
    const buttons = [
      { text: "Quick Play", y: 250, action: () => this.startGame("quick") },
      { text: "Play Online", y: 350, action: () => this.startGame("online") },
      { text: "Practice", y: 450, action: () => this.startGame("practice") },
      {
        text: this.wallet.connected ? "Disconnect Wallet" : "Connect Wallet",
        y: 550,
        action: this.wallet.connected
          ? disconnectWallet
          : () => alert("Open HashPack to connect"),
      },
    ];

    buttons.forEach((btn) => {
      const button = this.add.text(this.scale.width / 2, btn.y, btn.text, {
        font: "24px Comic Sans MS",
        color: "#FFF",
        backgroundColor: "#8B4513",
        padding: { x: 20, y: 12 },
      })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", btn.action)
        .on("pointerover", () => button.setStyle({ backgroundColor: "#A0522D" }))
        .on("pointerout", () => button.setStyle({ backgroundColor: "#8B4513" }));
    });

    if (!this.wallet.connected) {
      this.add.text(this.scale.width / 2, 650, "Connect wallet to play online!", {
        font: "18px Comic Sans MS",
        color: "#FF5555",
      }).setOrigin(0.5);
    }
  }

  private startGame(mode: string) {
    if (!this.wallet.connected && mode !== "practice") {
      alert("Connect your wallet to play online!");
      return;
    }
    if (mode === "practice") {
      alert("Practice mode coming soon!");
    } else {
      this.scene.start("Lobby");
    }
  }

  // Optional: update wallet later
  updateWallet(wallet: WalletData) {
    this.wallet = wallet;
    this.scene.restart({ wallet });
  }
}