/* eslint-disable no-undef */
// Import GameBoard module
const GameBoard = require('../src/game-board')

// Tests for GameBoard class
describe('GameBoard', () => {
  describe('createBoard()', () => {
    it('returns 10 x 10 game board when called with no arguments', () => {
      const gameBoard = new GameBoard()
      const board = gameBoard.board
      expect(board.length).toBe(10)
      expect(board[0].length).toBe(10)
    })

    it('returns 5 x 5 game board when called with custom arguments', () => {
      const gameBoard = new GameBoard(5, 7)
      const board = gameBoard.board
      expect(board.length).toBe(5)
      expect(board[0].length).toBe(7)
    })

    it('checks for correct values in each cell', () => {
      const gameBoard = new GameBoard(5, 5)
      const board = gameBoard.board
      // expect(board.length).toBe(5)
      expect(board[0][0]).toEqual({
        row: 0,
        column: 0,
        isOccupied: false,
        ship: '',
      })
      expect(board[3][4]).toEqual({
        row: 3,
        column: 4,
        isOccupied: false,
        ship: '',
      })
    })
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
})
