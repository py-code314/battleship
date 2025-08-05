// Create Ship class
export class Ship {
  // Private variables
  #hitCount

  constructor(length, position, direction) {
    this.id = crypto.randomUUID()
    this.length = length
    this.#hitCount = 0
    this.sunk = false
    this.position = position
    this.direction = direction
  }

  // Increment the hitCount
  hit() {
    if (this.#hitCount < this.length) {
      this.#hitCount++
    }
    this.isSunk()
  }

  // Return ship's sunk status
  isSunk() {
    if (this.#hitCount >= this.length) {
      this.sunk = true
    }
    return this.sunk
  }

  // Set starting coordinates of a ship
  setPosition(coordinates) {
    this.position = coordinates
  }

  // Get ship's starting position
  getPosition() {
    return [...this.position]
  }

  // Set direction for a ship
  setDirection(direction) {
    this.direction = direction
  }

  // Get ship's direction
  getDirection() {
    return this.direction
  }
}


