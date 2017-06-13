import 'babel-polyfill';

class GameState {
  constructor(game) {
    this.game = game;
    window.game = this;
  }

  init() {
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  // Load images and sounds
  preload() {
  }

  // Setup the example
  create() {

  }

  // The update() method is called every frame
  update() {

    this.handleNonPlayerKeys()

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
    if (this.enable_debug) {
      //this.game.debug.bodyInfo(this.player.sprite, 32, 32);
      //this.game.debug.body(this.player.sprite);
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
game.state.add('game', GameState, true);
