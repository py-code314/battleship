// Import classes
import { Ship, GameBoard, Player } from './aggregator.js'

// Create humanPlayer and computerPlayer
const humanPlayer = new Player('human')
const computerPlayer = new Player('computer')

function createHumanPlayerGameBoard() {
  const shipDetails = [
    [[1, 1], 5],
    [[3, 4], 4],
    [[6, 7], 3],
    [[8, 4], 3],
    [[5, 0], 2],
  ]

  // Loop through shipDetails and place ship at specific coordinates
  shipDetails.forEach((shipDetails) => {
    const [coordinates, length] = shipDetails
    const ship = humanPlayer.gameBoard.placeShip(coordinates, length)
    console.log(ship)
  })
}

createHumanPlayerGameBoard()

function createComputerPlayerGameBoard() {
  const shipDetails = [
    [[3, 2], 5],
    [[1, 5], 4],
    [[0, 0], 3],
    [[5, 4], 3],
    [[7, 6], 2],
  ]

  // Loop through shipDetails and place ship at specific coordinates
  shipDetails.forEach((shipDetails) => {
    const [coordinates, length] = shipDetails
    const ship = computerPlayer.gameBoard.placeShip(coordinates, length)
    console.log(ship)
  })
}

createComputerPlayerGameBoard()