export default class Necromancer {
  constructor(game) {
    this.game = game
    this.target = new Phaser.Point()
    this.MOVE_SPEED
  }

  preload() {

  }

  create() {
    const sprite = this.sprite = this.game.add.sprite()
    sprite.x = this.game.width / 2
    sprite.y = this.game.height / 2

    this.game.physics.arcade.enable(sprite)
    const body = sprite.body

    sprite.anchor.setTo(0.5, 0.5)

    const graphics = new Phaser.Graphics(this.game, 0, 0);
    graphics.beginFill(0x000088, 1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    sprite.boundsPadding = 0;

    sprite.addChild(graphics);


    console.log(this.game, this.game.width, body.position.x)
    //body.velocity.x = 10
  }

  moveTo(target) {
    this.target.copyFrom(target)
    game.physics.arcade.moveToPointer(this.sprite, this.MOVE_SPEED)

    //  if it's overlapping the mouse, don't move any more
    if (Phaser.Rectangle.contains(this.sprite.body, target.x, target.y)) {
      this.stop()
    }
  }

  stop() {
    this.sprite.body.velocity.setTo(0, 0)
  }

  update() {
    const sprite = this.sprite
    const body = sprite.body
  }
}
