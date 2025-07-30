// Import classes
import { Player,  } from './aggregator.js'

// console.log(humanGameBoard, computerGameBoard)

// Create humanPlayer and computerPlayer
export const humanPlayer = new Player('human')
export const computerPlayer = new Player('computer')

// Place ships on human game board
export function populateHumanGameBoard() {
  humanPlayer.gameBoard.resetBoard()

  const shipLengths = [5, 4, 3, 3, 2]
  const length = shipLengths.length

  for (let i = 0; i < length; i++) {
    let ship
    do {
      const row = Math.floor(Math.random() * (9 + 1))
      const column = Math.floor(Math.random() * (9 + 1))
      const coordinates = [row, column]
      ship = humanPlayer.gameBoard.placeShip(coordinates, shipLengths[i])
      // console.log(ship)
    } while (!ship)
  }
}

// Place ships on computer game board
export function populateComputerGameBoard() {
  const shipLengths = [5, 4, 3, 3, 2]
  const length = shipLengths.length

  for (let i = 0; i < length; i++) {
    let ship

    do {
      const row = Math.floor(Math.random() * (9 + 1))
      const column = Math.floor(Math.random() * (9 + 1))
      const coordinates = [row, column]

      ship = computerPlayer.gameBoard.placeShip(coordinates, shipLengths[i])
      // console.log(ship)
    } while (!ship)
  }
}
