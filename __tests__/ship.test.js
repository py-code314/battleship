/* eslint-disable no-undef */
// Import Ship
const Ship = require('../src/ship')

// Tests for Ship functions
describe('Ship', () => {
  

  describe('hit()', () => {
    it('should be defined as a function ', () => {
      const ship = new Ship(1)
      expect(typeof ship.hit).toBe('function')
    })

    it('increments hitCount by 1 when called', () => {
      const ship = new Ship(2)
      ship.hit()
      expect(ship.hitCount).toBe(1)
    })

    it('increments hitCount correctly when called multiple times', () => {
      const ship = new Ship(3)
      ship.hit()
      ship.hit()
      ship.hit()
      expect(ship.hitCount).toBe(3)
    })

    it('does not change the value of sunk', () => {
      const ship = new Ship(4)
      ship.hit()
      expect(ship.sunk).toBe(false)
    })

    it('returns undefined when called ', () => {
      const ship = new Ship(5)
      // ship.hit()
      expect(ship.hit()).toBeUndefined()
    })

    
  })
  
})

// test('Sanity check', () => {
//   expect(true).toBe(true)
// })
