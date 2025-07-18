// Create Ship class
class Ship {
  // Private variables
  #hitCount

  constructor(length) {
    this.length = length
    // These two values are same for every ship when created
    this.#hitCount = 0
    this.sunk = false
  }

  // Increment the hitCount
  hit() {
    if (this.#hitCount < this.length) {
      this.#hitCount++
    }
  }

  // Return ship's sunk status
  isSunk() {
    if (this.#hitCount >= this.length) {
      this.sunk = true
    }
    return this.sunk
  }
}

module.exports = Ship
