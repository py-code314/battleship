/* Import modules */
import { GameBoard } from './game-board'

/* Player class */
export class Player {
  constructor(type) {
    this.type = type
    this.gameBoard = new GameBoard()
    this.name = type === 'human' ? 'Human' : 'Computer'
  }

  /* Executes a move by attacking the specified coordinates on the enemy's game board */
  makeMove(enemyBoard, coordinates) {
    const success = enemyBoard.receiveAttack(coordinates)
    return success
  }

  /* Returns true if all ships on the player's board are sunk */
  isLost() {
    return this.gameBoard.allShipsSunk()
  }
}
