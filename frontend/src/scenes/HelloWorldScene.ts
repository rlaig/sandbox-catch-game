import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('helloworld')
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')

    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
    this.load.image('green', 'assets/particles/green.png')
  }

  create() {
    this.createEmitter()
  }

  createEmitter() {
    const particles = this.add.particles('red')

    const emitter = particles.createEmitter({
      speed: 50,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      lifespan: 1000,
      frequency: 900,
    })

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(-200, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
  }
}