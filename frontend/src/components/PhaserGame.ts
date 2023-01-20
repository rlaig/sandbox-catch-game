import Phaser from 'phaser'

import MainScene from '../scenes/MainScene'
import StartGameScene from '../scenes/StartGameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#282c34',
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: 1024, //800
    height: 576, //576 //600
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [MainScene, StartGameScene]
}

export default () => {
    return new Phaser.Game(config)
}