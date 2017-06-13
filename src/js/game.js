import 'babel-polyfill';

import Necromancer from './necromancer.js'
import MobManager from './mob_manager.js'

class GameState {
  constructor(game) {
    this.game = game;
    window.game = this;
  }

  init() {
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true

    this.necromancer = new Necromancer(this.game)
    this.mob_manager = new MobManager(this.game)

    //this.game.physics.arcade.enable()
    game.time.desiredFps = 60
  }

  // Load images and sounds
  preload() {
    this.mob_manager.preload()
    this.necromancer.preload()
  }

  // Setup the example
  create() {
    this.game.stage.backgroundColor = 0x008800;

    this.mob_manager.create()
    this.necromancer.create()

    this.mob_manager.spawn(this.necromancer.sprite.body.position, 50)
  }

  // The update() method is called every frame
  update() {
    this.handleNonPlayerKeys()

    if (this.game.input.activePointer.leftButton.isDown) {
      this.necromancer.moveTo(this.game.input.activePointer);
    } else {
      this.necromancer.stop()
    }

    this.necromancer.update()
    this.mob_manager.update()

    this.mob_manager.collideAll(this.necromancer)
  }

  handleNonPlayerKeys() {
    if (this.input.keyboard.downDuration(Phaser.Keyboard.D, 1)) {
      this.enable_debug = !this.enable_debug;
      if (!this.enable_debug) {
        this.game.debug.reset();
      }
    }

    if (this.input.keyboard.downDuration(Phaser.Keyboard.P, 1)) {
      game.paused = true;
    }

  }

  render() {
    const game = this.game
    if (this.enable_debug) {
      //this.game.debug.bodyInfo(this.player.sprite, 32, 32);
      //this.game.debug.body(this.mob_manager.mobs);
      //this.mob_manager.all_mobs.forEach((group) => group.forEach((minion)=>game.debug.body(minion.sprite.body)))
    }
  }

  bindKeys() {
    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.P
    ]);
  }
}

var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game');

game.rnd.randomAround = function(current, buffer, max) {
  return current + this.sign() * this.integerInRange(buffer, max)
}

game.state.add('game', GameState, true);
