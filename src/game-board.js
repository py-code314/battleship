// GameBoard class to create a game board
class GameBoard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows
    this.columns = columns
    this.board = this.createBoard()
  }

  // Create a board
  createBoard() {
    const board = []
    // Loop through rows and columns and add object to each square
    for (let i = 0; i < this.rows; i++) {
      const row = []
      for (let j = 0; j < this.columns; j++) {
        row.push({ row: i, column: j })
      }
      board.push(row)
    }

    return board
  }
}

module.exports = GameBoard
