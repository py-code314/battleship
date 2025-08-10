/* Ship class */
export class Ship {
  // Private variables
  #hitCount

  constructor(length, direction, name) {
    this.id = crypto.randomUUID()
    this.length = length
    this.#hitCount = 0
    this.sunk = false
    this.position = []
    this.direction = direction
    this.name = name
    this.sunkNotified = false
  }

  /* Getters and Setters */
  setPosition(coordinates) {
    this.position = coordinates
  }

  getPosition() {
    return [...this.position]
  }

  setDirection(direction) {
    this.direction = direction
  }

  getDirection() {
    return this.direction
  }

  getSunkNotified() {
    return this.sunkNotified
  }

  setSunkNotified(value) {
    this.sunkNotified = value
  }

  /* Increments the hit counter */
  hit() {
    if (this.#hitCount < this.length) {
      this.#hitCount++
    }
    this.isSunk()
  }

  /* Checks if the ship is sunk */
  isSunk() {
    if (this.#hitCount >= this.length) {
      this.sunk = true
    }
    return this.sunk
  }
}
