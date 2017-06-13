export default class Mobs extends Phaser.Group {
  constructor(game, parent, name) {
    super(game, parent, name)
  }

  // add(sprite) {
  //   this.group.add(sprite)
  // }

  setTarget(target) {
    this.target = target
  }

  update() {
    this.game.physics.arcade.collide(this)

    const all_alive = this.checkAll('gameobject.is_alive', true)
    if (!all_alive) {
      
    }

    if (this.target) {
      this.forEach((mob)=> mob.gameobject.moveTowards(this.target.sprite.body.position) )
    }
  }
}
