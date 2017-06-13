//import randomWithBuffer from './utils'

import Minion from './minion.js'
import Mobs from './mobs.js'

export default class MobManager {
  constructor(game) {
    this.game = game;
  }

  preload() {
    Minion.preload(game)
  }

  create() {
    this.all_mobs = this.game.add.group(this.game.stage, 'all_mobs')
  }

  spawn(center, buffer) {
    console.log('spawing around', center)
    const rnd = this.game.rnd
    const spawn_group = new Mobs(this.game, this.all_mobs, 'spawn-' + this.all_mobs.length)
    const spawn_x = rnd.randomAround(center.x, buffer, buffer * 2)
    const spawn_y = rnd.randomAround(center.y, buffer, buffer * 2)
    for (let i = 0; i < 1; i++) {
      const x = rnd.randomAround(spawn_x, 0, 100)
      const y = rnd.randomAround(spawn_y, 0, 100)
      new Minion(this.game, spawn_group, x, y)
    }
  }

  update() {
    this.all_mobs.forEach(group => group.update())
  }

  collideAll(gameobject) {
    this.all_mobs.forEach(group => this.game.physics.arcade.collide(gameobject.sprite, group,
    (sprite, mob) => {
      group.setTarget(gameobject)
      gameobject.attack(mob.gameobject)
    }))
  }
}
