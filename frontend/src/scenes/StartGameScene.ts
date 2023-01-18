import Phaser from 'phaser'

// set game time here
const gameTimeInSeconds = 60

export default class StartGameScene extends Phaser.Scene {
  constructor() {
    super('startgame')
  }

  static gameTime: number
  static gameTimer: Phaser.Time.TimerEvent
  static gameCountdownTimer: Phaser.Time.TimerEvent
  static platforms: Phaser.Physics.Arcade.StaticGroup
  static player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  static particleManager: Phaser.GameObjects.Particles.ParticleEmitterManager
  static playerParticle: Phaser.GameObjects.Particles.ParticleEmitter
  static cursors: Phaser.Types.Input.Keyboard.CursorKeys
  static goodGroup: Phaser.GameObjects.Group
  static badGroup: Phaser.GameObjects.Group
  static score: number
  static scoreText: Phaser.GameObjects.Text
  static timerText: Phaser.GameObjects.Text
  static moveRight: boolean
  static moveLeft: boolean

  preload() {
    // assets already preloaded at MainScene.ts
  }

  create() {
    // background
    this.add.image(512, 288, 'bg1')

    // stats
    StartGameScene.scoreText = this.add.text(16, 16, 'SCORE: 0', { 
      fontSize: '18px',
      color: '#eee',
      stroke: '#222',
      strokeThickness: 5,
      align: 'center',
      padding: {
        x: 12,
        y: 12
      }
    })
    StartGameScene.gameTime = gameTimeInSeconds
    StartGameScene.timerText = this.add.text(475, 10, `${StartGameScene.gameTime}`, { 
      fontSize: '32px',
      color: '#eee',
      // backgroundColor: '#222',
      stroke: '#222',
      strokeThickness: 5,
      padding: {
        x: 12,
        y: 12
      }
    })
  
    // platform
    StartGameScene.platforms = this.physics.add.staticGroup()
    StartGameScene.platforms.create(512, 575, 'ground').setScale(1).refreshBody()

    // playerParticle & player
    const boatParticle = this.add.particles('blue')
    StartGameScene.player = this.physics.add.sprite(512, 500, 'boat');
    StartGameScene.player.setBounce(0.7)
    StartGameScene.player.setCollideWorldBounds(true, 1, 1)

    // touch controls
    this.add.sprite(60, 288, 'left').setScale(0.1).setInteractive()
      .on('pointerdown', () => {
        StartGameScene.moveRight = false
        StartGameScene.moveLeft = true
      })
      .on('pointerup', () => {
        StartGameScene.moveLeft = false
      })
    this.add.sprite(964, 288, 'right').setScale(0.1).setInteractive()
      .on('pointerdown', () => {
        StartGameScene.moveLeft = false
        StartGameScene.moveRight = true
      })
      .on('pointerup', () => {
        StartGameScene.moveRight = false
      })

    // cursor manager
    StartGameScene.cursors = this.input.keyboard.createCursorKeys();

    // groups
    StartGameScene.goodGroup = this.physics.add.group()
    StartGameScene.badGroup = this.physics.add.group()

    // add overlap & collider events
    this.physics.add.collider(StartGameScene.player, StartGameScene.platforms);
    this.physics.add.overlap(
        StartGameScene.player,
        StartGameScene.badGroup,
        this.collectBad,
        undefined,
        this
    );
    this.physics.add.overlap(
        StartGameScene.player,
        StartGameScene.goodGroup,
        this.collectGood,
        undefined,
        this
    );
    this.physics.add.overlap(
        StartGameScene.platforms,
        StartGameScene.goodGroup,
        this.removeCollect,
        undefined,
        this
    );
    this.physics.add.overlap(
        StartGameScene.platforms,
        StartGameScene.badGroup,
        this.removeCollect,
        undefined,
        this
    );

    // start game timer see `gameTimeInSeconds`
    StartGameScene.gameCountdownTimer = this.time.addEvent({ delay: 1000, callback: this.countdown, callbackScope: this, loop: true });
    StartGameScene.gameTimer = this.time.delayedCall(gameTimeInSeconds*1000, this.endGame, [], this);
    StartGameScene.score = 0

    this.objectDrop()

    // particles for boat
    StartGameScene.playerParticle = boatParticle.createEmitter({
      speed: 30,
      scale: { start: 0.1, end: 0 },
      blendMode: 'ADD',
      lifespan: 1000,
      frequency: 10,
    })
    StartGameScene.playerParticle.startFollow(StartGameScene.player,0,50)
  }

  update(time: number, delta: number): void {
    if (StartGameScene.cursors.left.isDown || StartGameScene.moveLeft)
    {
      StartGameScene.player.setVelocityX(-360);
      StartGameScene.playerParticle.start()
    }
    else if (StartGameScene.cursors.right.isDown || StartGameScene.moveRight)
    {
      StartGameScene.player.setVelocityX(360);
      StartGameScene.playerParticle.start()
    }
    else
    {
      StartGameScene.playerParticle.stop()
      StartGameScene.player.setVelocityX(0);
    }

    if (StartGameScene.cursors.up.isDown && StartGameScene.player.body.touching.down)
    {
      StartGameScene.player.setVelocityY(-130);
    }
  }

  // Helper functions
  collectGood(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, collect: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    StartGameScene.score += 50
    StartGameScene.scoreText.setText('SCORE: ' + StartGameScene.score);
    console.log('good', StartGameScene.score)
    const particles = this.add.particles('green') 
    const emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        lifespan: 900,
        frequency: 900
    })
    emitter.startFollow(player)
    this.time.delayedCall(900, function() {
        particles.destroy();
    });
    collect.destroy()
  }
  collectBad(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, collect: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    StartGameScene.score -= 100
    StartGameScene.scoreText.setText('SCORE: ' + StartGameScene.score);
    console.log('bad', StartGameScene.score)
    const particles = this.add.particles('red') 
    const emitter = particles.createEmitter({
        speed: 50,
        scale: { start: 0.8, end: 0 },
        blendMode: 'ADD',
        lifespan: 400,
        frequency: 100
    })
    emitter.startFollow(player)
    this.time.delayedCall(500, function() {
        particles.destroy();
    });
    collect.destroy()
  }
  removeCollect(platform: Phaser.Types.Physics.Arcade.GameObjectWithBody, collect: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    collect.destroy()
  }
  createObjects(x: number, y: number, isBad: boolean = false) {
    const points = isBad ? ["e1", "e2"] : ["p1", "p2", "p3", "p4"]
    const group = isBad ? StartGameScene.badGroup : StartGameScene.goodGroup
    const randomIdx = Math.floor(Math.random() * points.length)
    const particles = isBad ? this.add.particles('red') : this.add.particles('green') 
    const pointObject = group.create(x, y, points[randomIdx]).setScale(0.1)

    const valuex = Phaser.Math.Between(-200, 200);
    const valuey = Phaser.Math.Between(0, 300);
    pointObject.setVelocity(valuex, valuey)
    pointObject.setBounce(1, 1)
    pointObject.setCollideWorldBounds(true)
    
    const emitter = particles.createEmitter({
        speed: 50,
        scale: { start: 0.1, end: 0 },
        blendMode: 'ADD',
        lifespan: 500,
        frequency: 30
    })
    emitter.startFollow(pointObject)
    this.time.delayedCall(1500, function() {
        particles.destroy();
    });
  }
  objectDrop() {
    let xAxis = Math.floor(Math.random() * 990) + 20;
    let edibleOrInedible = Math.floor(Math.random() * 3);
    // create and drop inedible food 1/3 of the time
    if (edibleOrInedible === 2) {
      this.createObjects(xAxis, 20, true);
      // create and drop an edible food 2/3 of the time
    } else {
      this.createObjects(xAxis, 20);
    }
    
    let delay = Phaser.Math.Between(500,1000)
    this.time.delayedCall(delay, this.objectDrop, [], this); 
    if(Math.random()==0)
        this.time.delayedCall(delay, this.objectDrop, [], this); 
  }
  endGame() {
    this.scene.stop()
    const showMenuEvent = new CustomEvent('show-menu', {
        detail: true,
    })
    window.dispatchEvent(showMenuEvent)
    const sendScore = new CustomEvent('send-score', {
        detail: { score: StartGameScene.score },
    })
    window.dispatchEvent(sendScore)

    console.log('game ended')
  }
  countdown() {
    StartGameScene.gameTime -= 1
    StartGameScene.timerText.setText(`${StartGameScene.gameTime}`);
  }

}