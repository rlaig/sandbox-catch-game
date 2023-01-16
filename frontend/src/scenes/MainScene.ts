import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('main')
  }

  preload() {
    this.load.image('bg1', '/assets/bg1a.png');
    this.load.image('ground', '/assets/platform.png');
    this.load.image('boat', '/assets/boat-small.png');
    this.load.image('e1', '/assets/e1.png');
    this.load.image('e2', '/assets/e2.png');
    this.load.image('p1', '/assets/p1.png');
    this.load.image('p2', '/assets/p2.png');
    this.load.image('p3', '/assets/p3.png');
    this.load.image('p4', '/assets/p4.png');
    this.load.image('red', '/assets/red.png');
    this.load.image('green', '/assets/green.png');
    this.load.image('blue', '/assets/blue.png');
  }

  create() {
    // background
    this.add.image(512, 288, 'bg1');
    this.createEmitter()
  }

  createEmitter() {
    const particles = this.add.particles('blue')

    const emitter = particles.createEmitter({
      speed: 30,
      scale: { start: 0.1, end: 0 },
      blendMode: 'ADD',
      lifespan: 1000,
      frequency: 10,
    })

    const logo = this.physics.add.image(512, 500, 'boat')

    logo.setVelocity(200, 50)
    logo.setBounce(1, 0.1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo,0,50)
  }
}