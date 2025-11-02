// src/game.ts
import Phaser from "phaser";
import HomeScene from "./scenes/HomeScene";
import LobbyScene from "./scenes/LobbyScene";

export const createGame = (parent: string | HTMLElement) => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent,
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 300 } },
    },
    scene: [HomeScene, LobbyScene],
  });
};