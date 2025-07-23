import { GameBoard } from './aggregator.js'

export class Player {
  constructor(type) {
    this.type = type
    this.gameBoard = new GameBoard()
    this.name = type === 'human' ? 'Player' : 'Computer'
  }

  

  // Execute player's move
  makeMove(enemyBoard, coordinates) {
    if (this.type === 'human') {
      enemyBoard.receiveAttack(coordinates)
    } else if (this.type === 'computer') {
      const randomCoordinates = this.generateRandomCoordinates()
      enemyBoard.receiveAttack(randomCoordinates)
    }
  }

  // Generate random coordinates
  generateRandomCoordinates() {
    let row, column, key, randomCoordinates

    // Throw error if all squares are hit
    if (this.gameBoard.allHits.size >= 100) {
      throw new Error('All squares have been hit')
    }

    // Check if the coordinates are already in the Set
    do {
      row = Math.floor(Math.random() * 10)
      column = Math.floor(Math.random() * 10)
      key = `${row},${column}`
      randomCoordinates = [row, column]
    } while (this.gameBoard.allHits.has(key))
    

    return randomCoordinates
  }

  // Player's win status
  isLost() {
    return this.gameBoard.allShipsSunk()
  }
}


