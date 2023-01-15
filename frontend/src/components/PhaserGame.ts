import Phaser from 'phaser'

import HelloWorldScene from '../scenes/HelloWorldScene'
import StartGameScene from '../scenes/StartGameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#282c34',
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: 1024,
    height: 576,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [HelloWorldScene, StartGameScene],
}

export default function () {
    return new Phaser.Game(config)
}