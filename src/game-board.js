// GameBoard class to create a game board
export class GameBoard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows
    this.columns = columns
    this.board = this.createBoard()
    this.ships = []
    this.emptyCells = []
    this.allHits = new Set()
    this.shipCells = new Set()
  }

  // Get ships array
  getShips() {
    return [...this.ships]
  }

  setShips(ship) {
    this.ships.push(ship)
  }

  getAllHits() {
    return this.allHits
  }

  getShipCells() {
    return this.shipCells
  }

  addShipCell(coordinates) {
    this.shipCells.add(`${coordinates}`)
  }

  // Create a board
  createBoard() {
    const board = []

    // Loop through rows and columns and add object to each cell
    for (let i = 0; i < this.rows; i++) {
      const row = []
      for (let j = 0; j < this.columns; j++) {
        row.push({
          row: i,
          column: j,
          isOccupied: false,
          ship: null,
          isHit: false,
          isReserved: false,
        })
      }
      board.push(row)
    }

    return board
  }

  // Place a ship at specified coordinates
  placeShip(ship, coordinates) {
    const [row, column] = coordinates

    // Check for board boundaries
    if (
      row < 0 ||
      row >= this.rows ||
      column < 0 ||
      column >= this.columns ||
      ship.length <= 0
    )
      return false

    // let isHorizontal
    // if (ship.direction === 'horizontal') {
    //   isHorizontal = true
    // } else {
    //   isHorizontal = false
    // }

    const isHorizontal = ship.getDirection() === 'horizontal'

    // Check for orientation boundaries

    if (
      (isHorizontal && column + ship.length > this.columns) ||
      (!isHorizontal && row + ship.length > this.rows)
    ) {
      return false
    }

    // Check for empty squares before the placement of ship
    for (let i = 0; i < ship.length; i++) {
      const square = isHorizontal
        ? this.board[row][column + i]
        : this.board[row + i][column]

      if (square.isOccupied || square.isReserved) return false
    }

    // Place the ship

    for (let i = 0; i < ship.length; i++) {
      const square = isHorizontal
        ? this.board[row][column + i]
        : this.board[row + i][column]

      square.ship = ship
      this.addShipCell([
        row + (isHorizontal ? 0 : i),
        column + (isHorizontal ? i : 0),
      ])
      square.isOccupied = true
    }

    // Update ship's position and direction
    ship.setPosition(coordinates)
    ship.setDirection(ship.direction)

    // Add new ship to ships array
    if (!this.ships.includes(ship)) {
      this.setShips(ship)
    }

    this.reserveCells(ship, coordinates)

    return true
  }

  reserveCells(ship, coordinates) {
    const [row, column] = coordinates
    const direction = ship.getDirection()

    // Mark cells adjacent to ship cells as reserved
    for (let i = 0; i < ship.length; i++) {
      const shipRow = direction === 'horizontal' ? row : row + i
      const shipColumn = direction === 'horizontal' ? column + i : column

      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const newRow = shipRow + j
          const newColumn = shipColumn + k

          // Check for board boundaries
          if (
            newRow >= 0 &&
            newRow < this.rows &&
            newColumn >= 0 &&
            newColumn < this.columns
          ) {
            const adjacentSquare = this.board[newRow][newColumn]
            if (!adjacentSquare.isOccupied) {
              adjacentSquare.isReserved = true
            }
          }
        }
      }
    }
  }

  // Move ship to new position when it's dragged
  clearShipAndReservedCells(ship) {
    const [row, column] = ship.getPosition()
    const direction = ship.getDirection()

    for (let i = 0; i < ship.length; i++) {
      const shipRow = direction === 'horizontal' ? row : row + i
      const shipColumn = direction === 'horizontal' ? column + i : column

      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const newRow = shipRow + j
          const newColumn = shipColumn + k

          // Reset reserved cells around a ship
          if (
            newRow >= 0 &&
            newRow < this.rows &&
            newColumn >= 0 &&
            newColumn < this.columns
          ) {
            const adjacentSquare = this.board[newRow][newColumn]
            adjacentSquare.isReserved = false
          }
        }
      }

      // Reset ship cells
      this.board[shipRow][shipColumn].isOccupied = false
      this.board[shipRow][shipColumn].ship = null
    }
  }

  // Prevents touching of adjacent ships
  canMoveTo(ship, coordinates) {
    const [row, column] = coordinates
    const { length, direction } = ship

    // Check for orientation boundaries
    if (
      (direction === 'horizontal' && column + length > this.columns) ||
      (direction === 'vertical' && row + length > this.rows)
    )
      return false

    for (let i = 0; i < length; i++) {
      const shipRow = direction === 'horizontal' ? row : row + i
      const shipCol = direction === 'horizontal' ? column + i : column

      // Check all adjacent cells for other ships
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const newRow = shipRow + j
          const newColumn = shipCol + k

          if (
            newRow >= 0 &&
            newRow < this.rows &&
            newColumn >= 0 &&
            newColumn < this.columns
          ) {
            const cell = this.board[newRow][newColumn]

            // Ignore the moving ship
            if (cell.isOccupied && cell.ship !== ship)
              // Only block other ship's adjacent cells

              return false
          }
        }
      }
    }
    return true
  }

  resetBoard() {
    this.board.forEach((row) => row.forEach((cell) => {
      cell.isHit = false
      cell.isOccupied = false
      cell.ship = null
      cell.isReserved = false
    }))
    this.ships = []
    this.emptyCells = []
    this.allHits = new Set()
    this.shipCells = new Set()
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;
    const targetSquare = this.board[row][col];

    if (targetSquare.isHit) {
      throw new Error('This square has already been hit');
    }
    targetSquare.isHit = true;
    this.allHits.add(`${row},${col}`);

    if (targetSquare.ship) {
      targetSquare.ship.hit();
      return true;
    } else {
      this.emptyCells.push(coordinates);
      return false;
    }
  }

  // Checks for sunken ships
  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }
}
