// src/scenes/Lobby.ts
import Phaser from 'phaser';

export default class LobbyScene extends Phaser.Scene {
  private rooms: string[] = ['Jungle Arena', 'Desert Storm', 'Snow Base'];
  private selectedRoom: number = 0;
  private players: string[] = [];

  constructor() {
    super('Lobby');
  }

  create() {
    // Background
    this.add.image(0, 0, 'lobby-bg').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

    // Title
    this.add.text(this.scale.width / 2, 80, 'SELECT ROOM', {
      font: '48px Comic Sans MS',
      color: '#FFF',
      stroke: '#000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    // Room Buttons
    this.rooms.forEach((room, i) => {
      const y = 200 + i * 100;
      const button = this.add.text(this.scale.width / 2, y, room, {
        font: '32px Comic Sans MS',
        color: '#FFF',
        backgroundColor: i === this.selectedRoom ? '#A0522D' : '#8B4513',
        padding: { x: 30, y: 15 },
      })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.joinRoom(room))
        .on('pointerover', () => {
          if (i !== this.selectedRoom) button.setStyle({ backgroundColor: '#A0522D' });
        })
        .on('pointerout', () => {
          if (i !== this.selectedRoom) button.setStyle({ backgroundColor: '#8B4513' });
        });

      // Highlight selected
      if (i === this.selectedRoom) {
        this.add.rectangle(button.x, button.y, button.width + 20, button.height + 10, 0xffff00, 0.3)
          .setOrigin(0.5);
      }
    });

    // Player List
    this.add.text(100, 150, 'PLAYERS IN ROOM:', {
      font: '24px Comic Sans MS',
      color: '#FFF',
    });

    this.players = ['You', 'Player2', 'Player3']; // Mock data
    this.players.forEach((p, i) => {
      this.add.text(120, 200 + i * 40, `• ${p}`, {
        font: '20px Comic Sans MS',
        color: '#FFF',
      });
    });

    // Back Button
    this.add.text(this.scale.width / 2, this.scale.height - 100, '← BACK', {
      font: '28px Comic Sans MS',
      color: '#FFF',
      backgroundColor: '#8B4513',
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('Home'));
  }

  preload() {
    this.load.image('lobby-bg', 'assets/background/lobby.png');
  }

  private joinRoom(room: string) {
    alert(`Joining ${room}...`);
    this.scene.start('Game', { room });
  }
}