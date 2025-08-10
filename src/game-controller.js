/* Import modules, classes, and functions */
import { Ship, handleDrop, humanPlayer, computerPlayer } from './aggregator.js'

/* Populate human game board with either a dropped ship or randomly placed ships */
export function populateHumanGameBoard(event) {
  const board = humanPlayer.gameBoard
  if (event.type === 'drop') {
    const { shipId, newCoordinates } = handleDrop(event)

    // Moving ship details
    const movingShip = board.getShips().find((ship) => ship.id === shipId)
    const oldPosition = movingShip.getPosition()

    // Clear ship and reserved cells
    board.clearShipAndReservedCells(movingShip)

    // Check if the ship can be moved
    const canMove = board.canMoveTo(movingShip, newCoordinates)
    if (canMove) {
      const success = board.placeShip(movingShip, newCoordinates)
      if (!success) {
        board.placeShip(movingShip, oldPosition)
      }
    } else {
      board.placeShip(movingShip, oldPosition)
    }

    // Reserve cells for all ships after ship's placement is over
    board
      .getShips()
      .forEach((ship) => board.reserveCells(ship, ship.getPosition()))
  } else {
    board.resetBoard()

    // Ship details
    const shipLengths = [5, 4, 3, 3, 2]
    const length = shipLengths.length
    const shipNames = [
      'Aircraft Carrier',
      'Battleship',
      'Submarine',
      'Cruiser',
      'Destroyer',
    ]

    for (let i = 0; i < length; i++) {
      let direction, success

      // Keep looping until a successful ship placement
      do {
        // Generate random coordinates and direction
        const row = Math.floor(Math.random() * 10)
        const column = Math.floor(Math.random() * 10)
        const coordinates = [row, column]
        const isHorizontal = Math.random() < 0.5
        direction = isHorizontal ? 'horizontal' : 'vertical'

        const ship = new Ship(shipLengths[i], direction, shipNames[i])

        success = board.placeShip(ship, coordinates)
      } while (!success)
    }
  }
}

/* Populates the computer's game board with ships of various lengths and names */
export function populateComputerGameBoard() {
  const board = computerPlayer.gameBoard

  // Ship details
  const shipLengths = [5, 4, 3, 3, 2]
  const shipNames = [
    'Aircraft Carrier',
    'Battleship',
    'Submarine',
    'Cruiser',
    'Destroyer',
  ]

  board.resetBoard()

  shipLengths.forEach((shipLength, i) => {
    let direction, success

    // Keep looping until a successful ship placement
    do {
      // Generate random coordinates and direction
      const row = Math.floor(Math.random() * 10)
      const column = Math.floor(Math.random() * 10)
      const isHorizontal = Math.random() < 0.5
      direction = isHorizontal ? 'horizontal' : 'vertical'

      const ship = new Ship(shipLength, direction, shipNames[i])

      success = board.placeShip(ship, [row, column])
    } while (!success)
  })
}

/* Changes the direction of the ship with the given shipId and new
   coordinates */
export function changeShipDirection(shipId, coordinates) {
  const board = humanPlayer.gameBoard

  // Moving ship details
  const movingShip = board.getShips().find((ship) => ship.id === shipId)
  const oldPosition = movingShip.getPosition()
  const oldDirection = movingShip.getDirection()

  // Clear ship and reserved cells
  board.clearShipAndReservedCells(movingShip)

  // Change direction
  movingShip.setDirection(
    oldDirection === 'horizontal' ? 'vertical' : 'horizontal'
  )

  const canMove = board.canMoveTo(movingShip, coordinates)

  // Check if the ship can be moved
  if (canMove) {
    const success = board.placeShip(movingShip, coordinates)

    if (!success) {
      board.placeShip(movingShip, oldPosition)
    }
  } else {
    movingShip.setDirection(oldDirection)
    board.placeShip(movingShip, oldPosition)
  }

  // Reserve cells for all ships after ship's placement is over
  board
    .getShips()
    .forEach((ship) => board.reserveCells(ship, ship.getPosition()))
}

/* Generates random coordinates on the game board that have not been hit yet */
export function generateRandomCoordinates(board) {
  // Check if all squares have been hit
  if (board.getAllHits().size >= 100) {
    throw new Error('All squares have been hit')
  }

  let randomCoordinates
  do {
    const row = Math.floor(Math.random() * 10)
    const column = Math.floor(Math.random() * 10)
    randomCoordinates = [row, column]
  } while (board.getAllHits().has(randomCoordinates.toString()))

  return randomCoordinates
}

/* Generates adjacent ship coordinates around the given coordinates */
export function generateAdjacentShipCoordinates(board, coordinates) {
  const [row, column] = coordinates
  const adjacentShipCoordinatesArray = []

  // Check all adjacent cells
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i
      const newColumn = column + j

      // Check for board boundaries
      if (
        newRow >= 0 &&
        newRow < board.rows &&
        newColumn >= 0 &&
        newColumn < board.columns
      ) {
        const adjacentCoordinates = [newRow, newColumn]

        // Add an adjacent cell if it has a ship and not hit already
        if (
          board.getShipCells().has(`${adjacentCoordinates}`) &&
          adjacentCoordinates.toString() !== coordinates.toString() &&
          !board.getAllHits().has(`${adjacentCoordinates}`)
        ) {
          adjacentShipCoordinatesArray.push(adjacentCoordinates)
        }
      }
    }
  }

  return adjacentShipCoordinatesArray
}
