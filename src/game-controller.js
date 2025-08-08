// Import classes
import { Ship, handleDrop, humanPlayer, computerPlayer } from './aggregator.js'

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
    const canMove = humanPlayer.gameBoard.regulateMovableCells(
      movingShip,
      newCoordinates
    )
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
    humanPlayer.gameBoard
      .getShips()
      .forEach((ship) =>
        humanPlayer.gameBoard.reserveCells(ship, ship.getPosition())
      )
  } else {
    humanPlayer.gameBoard.resetBoard()

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
        const row = Math.floor(Math.random() * (9 + 1))
        const column = Math.floor(Math.random() * (9 + 1))
        const coordinates = [row, column]
        const isHorizontal = Math.random() < 0.5
        direction = isHorizontal ? 'horizontal' : 'vertical'

        const ship = new Ship(
          shipLengths[i],
          direction,
          shipNames[i]
        )
        // const ship = new Ship(
        //   shipLengths[i],
        //   coordinates,
        //   direction,
        //   shipNames[i]
        // )

        success = humanPlayer.gameBoard.placeShip(ship, coordinates)
      } while (!success)
    }
  }
}

// Place ships on computer game board
export function populateComputerGameBoard() {
  computerPlayer.gameBoard.resetBoard()

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
    let ship, direction, success

    // Keep looping until a successful ship placement
    do {
      // Generate random coordinates and direction
      const row = Math.floor(Math.random() * (9 + 1))
      const column = Math.floor(Math.random() * (9 + 1))
      const coordinates = [row, column]
      const isHorizontal = Math.random() < 0.5
      direction = isHorizontal ? 'horizontal' : 'vertical'

      ship = new Ship(shipLengths[i], direction, shipNames[i])
      // ship = new Ship(shipLengths[i], coordinates, direction, shipNames[i])
      success = computerPlayer.gameBoard.placeShip(ship, coordinates)
    } while (!success)
  }
}

// Changes ship direction and places ship on board
export function changeShipDirection(shipId, coordinates) {
  // Moving ship details
  const movingShip = humanPlayer.gameBoard
    .getShips()
    .find((ship) => ship.id === shipId)

  const oldCoordinates = movingShip.getPosition()
  const oldDirection = movingShip.getDirection()

  humanPlayer.gameBoard.clearShipAndReservedCells(movingShip)
  movingShip.direction =
    oldDirection === 'horizontal' ? 'vertical' : 'horizontal'
  const canMove = humanPlayer.gameBoard.regulateMovableCells(
    movingShip,
    coordinates
  )

  if (canMove) {
    const success = humanPlayer.gameBoard.placeShip(movingShip, coordinates)

    if (!success) {
      humanPlayer.gameBoard.placeShip(movingShip, oldCoordinates)
    }
  } else {
    movingShip.direction = oldDirection
    humanPlayer.gameBoard.placeShip(movingShip, oldCoordinates)
  }

  // Reserve cells after ship's placement is over
  humanPlayer.gameBoard
    .getShips()
    .forEach((ship) =>
      humanPlayer.gameBoard.reserveCells(ship, ship.getPosition())
    )
}

// Returns random adjacent coordinates of a successful hit
export function generateAdjacentShipCoordinates(enemyBoard, coordinates) {
  const [row, column] = coordinates
  const adjacentShipCoordinatesArray = []

  // Check all adjacent cells
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i
      const newColumn = column + j

      if (
        newRow >= 0 &&
        newRow < enemyBoard.rows &&
        newColumn >= 0 &&
        newColumn < enemyBoard.columns
      ) {
        const adjacentCoordinates = [newRow, newColumn]

        // Add an adjacent cell if it has a ship and not hit already
        if (
          enemyBoard.getShipCells().has(`${adjacentCoordinates}`) &&
          adjacentCoordinates.toString() !== coordinates.toString() &&
          !enemyBoard.getAllHits().has(`${adjacentCoordinates}`)
        ) {
          adjacentShipCoordinatesArray.push(adjacentCoordinates)
        }
      }
    }
  }

  return adjacentShipCoordinatesArray
}

// Generate random coordinates
export function generateRandomCoordinates(enemyBoard) {
  let row, column, key, randomCoordinates

  // Throw error if all squares are hit
  if (enemyBoard.getAllHits().size >= 100) {
    throw new Error('All squares have been hit')
  }

  // Check if the coordinates are already in the Set
  do {
    row = Math.floor(Math.random() * 10)
    column = Math.floor(Math.random() * 10)
    key = `${row},${column}`
    randomCoordinates = [row, column]
  } while (enemyBoard.getAllHits().has(key))

  return randomCoordinates
}
