/* eslint-disable no-undef */
// Import Ship
import {Ship} from '../src/ship.js'

// Tests for Ship functions
describe('Ship', () => {
  describe('isSunk()', () => {
    it('Returns false for a new ship', () => {
      const ship = new Ship(2)
      expect(ship.isSunk()).toBe(false)
    })

    it('Returns false if it is hit fewer times than the length', () => {
      const ship = new Ship(3)
      ship.hit()
      ship.hit()
      expect(ship.isSunk()).toBe(false)
    })
 
    it("Returns true if it is hit equal times to it's length", () => {
      const ship = new Ship(3)
      ship.hit()
      ship.hit()
      ship.hit()
      expect(ship.isSunk()).toBe(true)
    })

    it('Returns true if the hit count exceeds the length', () => {
      const ship = new Ship(3)
      ship.hit()
      ship.hit()
      ship.hit()
      ship.hit()
      expect(ship.isSunk()).toBe(true)
    })
  })
})
