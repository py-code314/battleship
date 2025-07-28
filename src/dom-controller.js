

// Create human game board with default ship colors
export function renderHumanGameBoard(container, board) {
  const cellSize = container.offsetWidth / 10
 

  board.forEach((row) => {
    row.forEach((cell) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell')
      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.textContent =  cell.marker 
      
      if (cell.ship) {
        square.style.backgroundColor = 'gray'
      }

      container.appendChild(square)

    })
  })
}

// Create computer game board
export function renderComputerGameBoard(container, board) {
  const cellSize = container.offsetWidth / 10
 

  board.forEach((row) => {
    row.forEach((cell) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell')
      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.textContent =  cell.marker 
      
      // if (cell.ship) {
      //   square.style.backgroundColor = 'gray'
      // }

      container.appendChild(square)

    })
  })
}
