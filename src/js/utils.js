export function randomWithBuffer(current, buffer, max) {
  const rnd = this.game.rnd
  return current + rng.sign() * rnd.integerInRange(buffer, max)
}
