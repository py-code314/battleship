// Import
import { Ship } from './aggregator.js'



// GameBoard class to create a game board
class GameBoard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows
    this.columns = columns
    this.board = this.createBoard()
    this.ships = [] //
    this.emptySquares = []
  }

  // Create a board
  createBoard() {
    const board = []
    // Loop through rows and columns and add object to each square
    for (let i = 0; i < this.rows; i++) {
      const row = []
      for (let j = 0; j < this.columns; j++) {
        row.push({
          row: i,
          column: j,
          isOccupied: false,
          ship: null,
          isHit: false,
        })
      }
      board.push(row)
    }

    return board
  }

  // Place a ship at specified coordinates
  placeShip(row, column, shipLength) {
    // Create a ship
    const ship = new Ship(shipLength)

    // Check for boundaries
    if (
      row < 0 ||
      row >= this.rows ||
      column < 0 ||
      column >= this.columns ||
      shipLength <= 0
    )
      return false

    const isHorizontal = Math.random() < 0.5

    // Check for orientation boundaries
    if (isHorizontal && column + ship.length > this.columns) return false
    if (!isHorizontal && row + ship.length > this.rows) return false

    // Check for empty squares before the placement of ship
    for (let i = 0; i < ship.length; i++) {
      const square = isHorizontal
        ? this.board[row][column + i]
        : this.board[row + i][column]

      if (square.isOccupied) return false
    }

    // Place the ship
    for (let i = 0; i < ship.length; i++) {
      const square = isHorizontal
        ? this.board[row][column + i]
        : this.board[row + i][column]

      square.isOccupied = true
      // Mark the square with ship
      square.ship = ship
    }

    // Add ship to ships array
    this.ships.push(ship)

    return true
  }

  receiveAttack(row, column) {
    // Get the square
    const square = this.board[row][column]

    // Check if the square is already hit
    if (square.isHit) {
      throw new Error('You have already hit that square')
    }
    square.isHit = true

    // Check for a ship in the square
    if (square.ship) {
      square.ship.hit()
      return true
    } else {
      this.emptySquares.push([row, column])
      return false
    }
  }

  // Checks for sunken ships
  allShipsSunken() {
    
    return this.ships.every(ship => ship.isSunk())
  }
}

module.exports = GameBoard
