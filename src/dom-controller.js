

// Create human game board with default ship colors
export function renderHumanGameBoard(container, board) {
  container.textContent = ''
  const cellSize = container.offsetWidth / 10
 

  board.forEach((row) => {
    row.forEach((cell) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell')
      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.textContent =  cell.marker 
      
      // Color ship
      if (cell.ship) {
        square.style.backgroundColor = 'gray'
      }

      // Color ship hit & empty square hit
      if (cell.isHit && cell.ship) {
        square.style.backgroundColor = 'red'
      } else if (cell.isHit && !cell.ship) {
        square.style.backgroundColor = 'orange'
      }

      container.appendChild(square)

    })
  })
}

// Create computer game board
export function renderComputerGameBoard(container, board) {
  container.textContent = ''
  const cellSize = container.offsetWidth / 10
 

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell')
      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.dataset.row = rowIndex
      square.dataset.column = columnIndex
      square.textContent =  cell.marker 
      
      // Color ship
      // if (cell.ship) {
      //   square.style.backgroundColor = 'gray'
      // }

      // Color ship hit & empty square hit
      if (cell.isHit && cell.ship) {
        square.style.backgroundColor = 'red'
      } else if (cell.isHit && !cell.ship) {
        square.style.backgroundColor = 'orange'
      }

      container.appendChild(square)

    })
  })
}


