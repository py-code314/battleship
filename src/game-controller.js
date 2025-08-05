// Import classes
import { Ship, Player, handleDrop } from './aggregator.js'

// Create humanPlayer and computerPlayer
export const humanPlayer = new Player('human')
export const computerPlayer = new Player('computer')


// Place ships on human game board
export function populateHumanGameBoard(e) {
  if (e.type === 'drop') {
    const { shipId, newCoordinates } = handleDrop(e)

    // Moving ship details
    const movingShip = humanPlayer.gameBoard
      .getShips()
      .find((ship) => ship.id === shipId)
    const oldCoordinates = movingShip.getPosition()

    humanPlayer.gameBoard.clearShipAndReservedCells(movingShip)
    const canMove = humanPlayer.gameBoard.regulateMovableCells(movingShip, newCoordinates)
    if (canMove) {
      const success = humanPlayer.gameBoard.placeShip(
        movingShip,
        newCoordinates
      )
      if (!success) {
        humanPlayer.gameBoard.placeShip(movingShip, oldCoordinates)
      }
    } else {
      humanPlayer.gameBoard.placeShip(movingShip, oldCoordinates)
    }
    

    // Reserve cells after ship's placement is over
    humanPlayer.gameBoard.getShips().forEach(ship => 
      humanPlayer.gameBoard.reserveCells(ship, ship.getPosition())
    )
  } else {
    humanPlayer.gameBoard.resetBoard()

    const shipLengths = [5, 4, 3, 3, 2]
    const length = shipLengths.length

    for (let i = 0; i < length; i++) {
      let ship, direction, success

      // Keep looping until a successful ship placement
      do {
        // Generate random coordinates and direction
        const row = Math.floor(Math.random() * (9 + 1))
        const column = Math.floor(Math.random() * (9 + 1))
        const coordinates = [row, column]
        const isHorizontal = Math.random() < 0.5
        direction = isHorizontal ? 'horizontal' : 'vertical'

        ship = new Ship(shipLengths[i], coordinates, direction)
        success = humanPlayer.gameBoard.placeShip(ship, coordinates)
      } while (!success)
    }
  }
}

// Place ships on computer game board
export function populateComputerGameBoard() {
  const shipLengths = [5, 4, 3, 3, 2]
  const length = shipLengths.length

  for (let i = 0; i < length; i++) {
    let ship, direction, success

    // Keep looping until a successful ship placement
    do {
      // Generate random coordinates and direction
      const row = Math.floor(Math.random() * (9 + 1))
      const column = Math.floor(Math.random() * (9 + 1))
      const coordinates = [row, column]
      const isHorizontal = Math.random() < 0.5
      direction = isHorizontal ? 'horizontal' : 'vertical'

      ship = new Ship(shipLengths[i], coordinates, direction)
      success = computerPlayer.gameBoard.placeShip(ship, coordinates)
    } while (!success)
  }
}
