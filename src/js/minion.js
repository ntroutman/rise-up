export default class Minion {
  constructor(game, group, x, y) {
    this.game = game;
    this.group = group
    this.spawn_x = x
    this.spawn_y = y

    this.health = 25
    this.is_alive = true
    this.damage_bounce = new Phaser.Point()
  // }
  //
  //
  //
  // create() {
    const sprite = this.sprite = this.game.add.sprite()
    sprite.gameobject = this
    sprite.x = this.spawn_x
    sprite.y = this.spawn_y

    this.group.add(sprite)

    this.game.physics.arcade.enable(sprite)
    const body = sprite.body

    sprite.anchor.setTo(0.5, 0.5)

    const graphics = this.graphics = new Phaser.Graphics(this.game, 0, 0);
    this.draw()


    sprite.boundsPadding = 0;

    sprite.addChild(graphics);
  }

  static preload(game) {

  }

  moveTowards(target_point) {
    if (!target_point) {
      return
    }

    if (!this.is_alive) {
      // the dead don't move ... yet
      this.sprite.body.velocity.setTo(0, 0)
      this.sprite.body.angularVelocity = 0
      return
    }

    const TURN_RATE = 90 // degrees per second
    const SPEED = 75

    const body = this.sprite.body
    const sprite = this.sprite

    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    let targetAngle = this.game.math.angleBetween(
        body.x, body.y,
        target_point.x, target_point.y
        // this.game.input.activePointer.x, this.game.input.activePointer.y
    );

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (sprite.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - sprite.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            body.angularVelocity = TURN_RATE;
        } else {
            // Turn counter-clockwise
            body.angularVelocity = -TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < game.math.degToRad(5)) {
            sprite.rotation = targetAngle;
            body.angularVelocity = 0
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    body.velocity.x = Math.cos(sprite.rotation) * SPEED + this.damage_bounce.x;
    body.velocity.y = Math.sin(sprite.rotation) * SPEED + this.damage_bounce.y;
    this.damage_bounce.setTo(0, 0)
  }

  damage(amount, source) {
    if (this.health <= 0) {
      return
    }

    console.log('damaged', amount, 'src', source, 'target',  this)

    this.health -= amount
    if (this.health <= 0) {
      this.kill(source)
    }

    let bounce = Phaser.Point.subtract(source.sprite.body.position, this.sprite.body.position)
    bounce.setMagnitude(-1500)
    this.damage_bounce.add(bounce.x, bounce.y)
  }

  kill(killer) {
    this.killer = killer
    this.is_alive = false
    this.health = 0
    this.draw()
    this.sprite.body.velocity.setTo(0, 0)
  }

  draw() {
    const graphics = this.graphics

    let color = this.is_alive ? 0xaa0000 : 0x666666

    graphics.beginFill(color, 1)
    //graphics.drawRect(-15, -15, 30, 30);
    graphics.drawPolygon([[20, 0], [-20, -15], [-20, 15]])
    //graphics.drawPolygon([[40, 15], [0, 30], [0, 0]]);
    graphics.lineStyle(2)
    graphics.drawCircle(0, 0, 5)
    graphics.endFill()
  }
}
