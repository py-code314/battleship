/* eslint-disable no-undef */

import { Player } from '../src/player'

describe('Player', () => {
  describe('makeMove()', () => {
    it('Returns true when the ship is hit', () => {
      const human = new Player('human')

      // Mock enemyBoard and coordinates
      const enemyBoard = { receiveAttack: jest.fn().mockReturnValue(true) }
      const coordinates = [3, 4]

      const result = human.makeMove(enemyBoard, coordinates)

      expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1)
      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(coordinates)
      expect(result).toBe(true)
    })

    it('Returns false when the ship is not hit', () => {
      const human = new Player('human')

      // Mock enemyBoard and coordinates
      const enemyBoard = { receiveAttack: jest.fn().mockReturnValue(false) }
      const coordinates = [3, 4]

      const result = human.makeMove(enemyBoard, coordinates)

      expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1)
      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(coordinates)
      expect(result).toBe(false)
    })
  })

  describe('isLost()', () => {
    it('Returns true if all ships are sunk', () => {
      const human = new Player('human')

      human.gameBoard.allShipsSunk = jest.fn(() => true)

      expect(human.isLost()).toBe(true)
    })

    it('Returns false if all ships are not sunk', () => {
      const human = new Player('human')

      human.gameBoard.allShipsSunk = jest.fn(() => false)

      expect(human.isLost()).toBe(false)
    })
  })
})
