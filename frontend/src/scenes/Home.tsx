// src/scenes/Home.tsx
import { useEffect, useRef } from "react";
import { createGame } from "../game";
import type { WalletData } from "../web3/walletConnect";

interface HomeScreenProps {
  wallet: WalletData | null;
}

export default function HomeScreen({ wallet }: HomeScreenProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current || gameInstance.current) return;

    const game = createGame(gameRef.current);
    gameInstance.current = game;

    // Start HomeScene immediately
    game.scene.start("Home", { wallet: wallet ?? { connected: false, accountId: "" } });

    // Optional: update wallet later
    if (wallet) {
      const scene = game.scene.getScene("Home");
      if (scene && "updateWallet" in scene) {
        (scene as any).updateWallet(wallet);
      }
    }

    return () => {
  }
}