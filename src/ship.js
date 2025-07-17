// Create Ship class
class Ship {
  constructor(length) {
    this.length = length
    // These two values are same for every ship when created
    this.hitCount = 0
    this.sunk = false
  }

  hit() {
    this.hitCount++
  }
}

module.exports = Ship
