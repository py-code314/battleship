/* eslint-disable no-undef */

import { Player } from '../src/aggregator.js'

describe('Player', () => {
  // Testing this indirectly in makeMove()
  // it('returns correct type of player', () => {
  //   const human = new Player('human')
  //   expect(human.type).toBe('human')

  //   const computer = new Player('computer')
  //   expect(computer.type).toBe('computer')
  // })

  describe('makeMove()', () => {
    it('calls receiveAttack() when the player is human', () => {
      const human = new Player('human')

      // Mock enemyBoard and coordinates
      const enemyBoard = { receiveAttack: jest.fn() }
      const coordinates = [3, 4]

      human.makeMove(enemyBoard, coordinates)

      expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1)
      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(coordinates)
    })

    it('generates random coordinates when the player is computer', () => {
      const computer = new Player('computer')

      // Mock enemyBoard and random coordinates
      const enemyBoard = { receiveAttack: jest.fn() }
      const randomCoordinates = [3, 4]
      computer.generateRandomCoordinates = jest.fn(() => randomCoordinates)

      computer.makeMove(enemyBoard)

      expect(computer.generateRandomCoordinates).toHaveBeenCalledTimes(1)
      expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1)
      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(randomCoordinates)
    })
  })

  describe('isLost()', () => {
    it('returns true if all ships are sunk', () => {
      const human = new Player('human')

      human.gameBoard.allShipsSunk = jest.fn(() => true)

      expect(human.isLost()).toBe(true)
    })

    it('returns false if all ships are not sunk', () => {
      const human = new Player('human')

      human.gameBoard.allShipsSunk = jest.fn(() => false)

      expect(human.isLost()).toBe(false)
    })
  })
})
