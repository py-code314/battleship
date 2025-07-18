/* eslint-disable no-undef */
// Import GameBoard module
const GameBoard = require('../src/game-board')

// Tests for GameBoard class
describe('GameBoard', () => {
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
    expect(board[0][0]).toEqual({ row: 0, column: 0 })
    expect(board[3][4]).toEqual({ row: 3, column: 4 })
  })
})
