/* eslint-disable no-undef */
// Import GameBoard module
import { GameBoard } from '../src/aggregator.js'

// Tests for GameBoard class
describe('GameBoard', () => {
  describe('createBoard()', () => {
    it('returns 10 x 10 game board when called with no arguments', () => {
      const gameBoard = new GameBoard()
      const board = gameBoard.board
      expect(board.length).toBe(10)
      expect(board[0].length).toBe(10)
    })

    it('returns 5 x 7 game board when called with custom arguments', () => {
      const gameBoard = new GameBoard(5, 7)
      const board = gameBoard.board
      expect(board.length).toBe(5)
      expect(board[0].length).toBe(7)
    })

    // it('checks for correct values in each cell', () => {
    //   const gameBoard = new GameBoard(5, 5)
    //   const board = gameBoard.board
    //   // expect(board.length).toBe(5)
    //   expect(board[0][0]).toEqual({
    //     row: 0,
    //     column: 0,
    //     isOccupied: false,
    //     ship: '',
    //   })
    //   expect(board[3][4]).toEqual({
    //     row: 3,
    //     column: 4,
    //     isOccupied: false,
    //     ship: '',
    //   })
    // })
  })

  describe('placeShip()', () => {
    let board

    // Set up a board before each test
    beforeEach(() => {
      board = new GameBoard()
    })

    it('returns false for out of bounds coordinates', () => {
      expect(board.placeShip(-1, 3, 4)).toBe(false)
      expect(board.placeShip(1, 10, 4)).toBe(false)
    })

    it('returns false for ship length less than or equal to 0', () => {
      expect(board.placeShip(1, 3, 0)).toBe(false)
    })

    it('checks for a successfully placed horizontal ship', () => {
      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.3)

      expect(board.placeShip(2, 3, 4)).toBe(true)

      // Clear mock
      Math.random.mockRestore()
    })

    it("doesn't place a horizontal ship in already occupied squares", () => {
      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.3)

      expect(board.placeShip(2, 3, 4)).toBe(true)
      expect(board.placeShip(2, 3, 4)).toBe(false)

      // Clear mock
      Math.random.mockRestore()
    })

    it("doesn't place a ship out of right boundary for a lengthy horizontal ship ", () => {
      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.3)

      expect(board.placeShip(2, 7, 4)).toBe(false)

      // Clear mock
      Math.random.mockRestore()
    })

    it('checks for a successfully placed vertical ship', () => {
      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.7)

      expect(board.placeShip(2, 3, 4)).toBe(true)

      // Clear mock
      Math.random.mockRestore()
    })

    it("doesn't place a vertical ship in already occupied squares", () => {
      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.7)

      expect(board.placeShip(2, 3, 4)).toBe(true)
      expect(board.placeShip(2, 3, 4)).toBe(false)

      // Clear mock
      Math.random.mockRestore()
    })

    it("doesn't place a vertical ship out of bottom boundary for a lengthy ship ", () => {
      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.3)

      expect(board.placeShip(7, 7, 4)).toBe(false)

      // Clear mock
      Math.random.mockRestore()
    })
  })

  describe('receiveAttack()', () => {
    let board

    // Set up a board and place ship before each test
    beforeEach(() => {
      board = new GameBoard()

      // Mock the Math.random function
      jest.spyOn(Math, 'random').mockReturnValue(0.3)

      board.placeShip(2, 3, 4)
    })

    // Clear mock after each test
    afterEach(() => {
      Math.random.mockRestore()
    })

    it('throws error if a square is hit second time', () => {
      expect(board.receiveAttack([2, 3])).toBe(true)
      expect(() => board.receiveAttack([2, 3])).toThrow(
        'You have already hit that square'
      )
    })

    it('checks for a hit on the ship', () => {
      expect(board.receiveAttack([2, 3])).toBe(true)
      expect(board.receiveAttack([2, 4])).toBe(true)
      expect(board.receiveAttack([2, 5])).toBe(true)
      expect(board.receiveAttack([2, 6])).toBe(true)
    })

    it('returns false if a hit misses the ship', () => {
      expect(board.receiveAttack([2, 2])).toBe(false)
      expect(board.receiveAttack([2, 7])).toBe(false)
    })

    it('adds a missed hit to emptySquares array', () => {
      board.receiveAttack([2, 7])
      expect(board.emptySquares).toContainEqual([2, 7])
    })

    it("doesn't add a hit to emptySquares array", () => {
      board.receiveAttack([2, 4])
      expect(board.emptySquares).not.toContainEqual([2, 7])
    })

    it('checks if square.ship.hit() is being called', () => {
      // Get the square where ship is placed
      const shipSquare = board.board[2][4]

      // Mock the function hit()
      shipSquare.ship.hit = jest.fn()

      board.receiveAttack([2, 4])

      expect(shipSquare.ship.hit).toHaveBeenCalledTimes(1)
    })
  })

  describe('allShipsSunk()', () => {
    let board

    // Set up a board and place ship before each test
    beforeEach(() => {
      board = new GameBoard()

      // Mock the Math.random function
      // jest.spyOn(Math, 'random').mockReturnValue(0.3)

      // board.placeShip(2, 3, 3)
      // board.placeShip(5, 3, 2)

      // Mock placeShip function
      board.placeShip = jest.fn(() => board.ships.push({}))
      board.placeShip()
      board.placeShip()
    })

    // Clear mock after each test
    afterEach(() => {
      // Math.random.mockRestore()
    })

    it('checks for all ships sunken', () => {
      // Mock isSunk function
      board.ships[0].isSunk = jest.fn(() => true)
      board.ships[1].isSunk = jest.fn(() => true)

      expect(board.allShipsSunk()).toBe(true)
    })

    it('returns false if all ships are not sunken', () => {
      // Mock isSunk function
      board.ships[0].isSunk = jest.fn(() => true)
      board.ships[1].isSunk = jest.fn(() => false)

      expect(board.allShipsSunk()).toBe(false)
    })

    it('checks that isSunk() is called on every ship', () => {
      // Mock isSunk function
      board.ships[0].isSunk = jest.fn().mockReturnValue(true)
      board.ships[1].isSunk = jest.fn().mockReturnValue(true)

      board.allShipsSunk()

      expect(board.ships[0].isSunk).toHaveBeenCalledTimes(1)
      expect(board.ships[1].isSunk).toHaveBeenCalledTimes(1)
    })

    it('skips calling isSunk() if ship in the middle is not sunk', () => {
      // Place a third ship for testing purpose
      board.placeShip()

      // Mock isSunk function
      board.ships[0].isSunk = jest.fn().mockReturnValue(true)
      board.ships[1].isSunk = jest.fn().mockReturnValue(false)
      board.ships[2].isSunk = jest.fn()

      board.allShipsSunk()

      expect(board.ships[0].isSunk).toHaveBeenCalledTimes(1)
      expect(board.ships[1].isSunk).toHaveBeenCalledTimes(1)
      expect(board.ships[2].isSunk).toHaveBeenCalledTimes(0)
    })

    it('returns true when there are no ships', () => {
      board.ships = []

      expect(board.allShipsSunk()).toBe(true)
    })
  })
})
