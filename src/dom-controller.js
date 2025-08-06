import {
  humanPlayer,
  computerPlayer,
  changeShipDirection,
} from './aggregator.js'

// Get DOM elements
export const playerTurn = document.querySelector('.player-turn')
const errorMessage = document.querySelector('.messages__error')
const messages = document.querySelector('.messages__container')

// Create human game board with default ship colors
export function renderHumanGameBoard(container, board) {
  container.textContent = ''

  let cellSize = container.offsetWidth / 10

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      // Create a div for each cell
      const square = document.createElement('div')

      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.dataset.row = `${rowIndex}`
      square.dataset.column = `${columnIndex}`

      square.textContent = cell.marker

      // Color ship
      if (cell.ship) {
        square.draggable = true
        square.dataset.shipId = `${cell.ship.id}`
        square.classList.add('ship')
      } else {
        square.classList.add('cell')
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

// Change message based on player's turn
export function displayPlayerTurn() {
  playerTurn.textContent = 'YOUR TURN'
}

export function updatePlayerTurn() {
  playerTurn.textContent = playerTurn.textContent === 'YOUR TURN'
    ? "COMPUTER'S TURN"
    : 'YOUR TURN'

  if (humanPlayer.isLost() || computerPlayer.isLost()) {
    playerTurn.textContent = 'GAME OVER!'
  }
}

// Show error on repeat hit on same square
export function handleRepeatHit(err) {
  errorMessage.textContent = err.message
}

// Clear error message
export function clearErrorMessage() {
  errorMessage.textContent = ''
}

// Make ship cells draggable
export function handleDragStart(e) {
  const shipId = e.target.dataset.shipId

  const shipCells = document.querySelectorAll(`[data-ship-id='${shipId}']`)
  shipCells.forEach((shipCell) => {
    shipCell.classList.add('drag-ship')
  })

  // Store ship id in dragging cell
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', shipId)
}

// Reset ship cells
export function handleDragEnd(e) {
  const shipId = e.target.dataset.shipId

  const shipCells = document.querySelectorAll(`[data-ship-id='${shipId}']`)

  shipCells.forEach((shipCell) => {
    shipCell.classList.remove('drag-ship')
  })
}

// Add visual indicator for drag over cells
export function handleDragEnter(e) {
  e.target.classList.add('drag-over')
}

export function handleDragLeave(e) {
  e.target.classList.remove('drag-over')
}

export function handleDragOver(e) {
  e.preventDefault()
  return false
}

// Return ship id and new coordinates for a dragged ship
export function handleDrop(e) {
  e.stopPropagation()
  e.target.classList.remove('drag-over')

  const shipId = e.dataTransfer.getData('text/plain')
  const row = +e.target.dataset.row
  const column = +e.target.dataset.column

  const newCoordinates = [row, column]
  return { shipId, newCoordinates }
}

// TODO: call populateHumanGameBoard() inside handleDrop()?

export function updateShipDirection(e) {
  if (e.target.classList.contains('ship')) {
    const shipId = e.target.dataset.shipId
    const row = +e.target.dataset.row
    const column = +e.target.dataset.column

    const newCoordinates = [row, column]

    changeShipDirection(shipId, newCoordinates)
  }
}

export function displayWelcomeMessage() {
  const welcome = document.createElement('p')
  welcome.classList.add('message')
  welcome.textContent = 'Welcome to the game. Click Play to get started'
  messages.appendChild(welcome)
}

export function displayStartGameMessage() {
  const legend = document.createElement('p')
  legend.classList.add('message')
  legend.textContent = 'Legend: Orange = Miss, Red = Hit'

  const turn = document.createElement('p')
  turn.classList.add('message')
  turn.textContent = 'Your turn: Click any square on the enemy board'

  messages.prepend(turn, legend)
}

export function animateMessages() {
  setTimeout(() => {
    messages.style.backgroundColor = '#fceb87ff'
    messages.style.transition = 'background-color 0.3s ease'

  }, 500)
  setTimeout(() => {
    messages.style.backgroundColor = 'white'
    messages.style.transition = 'background-color 0.5s ease'
  }, 1200)

  
}
