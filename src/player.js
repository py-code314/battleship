import { GameBoard } from './game-board'

export class Player {
  constructor(type) {
    this.type = type
    this.gameBoard = new GameBoard()
    this.name = type === 'human' ? 'Human' : 'Computer'
  }

  // Execute player's move
  makeMove(enemyBoard, coordinates) {
    const success = enemyBoard.receiveAttack(coordinates)
    return success
  }

  isLost() {
    return this.gameBoard.allShipsSunk()
  }
}
