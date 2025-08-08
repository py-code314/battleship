import {
  humanPlayer,
  computerPlayer,
  changeShipDirection,
} from './aggregator.js'

// Get DOM elements
export const playerTurn = document.querySelector('.player-turn')
const messages = document.querySelector('.messages__container')
const resetButton = document.querySelector('#reset')
const randomizeButton = document.querySelector('#randomize')
const playButton = document.querySelector('#play')
const standardButton = document.querySelector('#standard')
const advancedButton = document.querySelector('#advanced')

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
  playerTurn.textContent =
    playerTurn.textContent === 'YOUR TURN' ? "COMPUTER'S TURN" : 'YOUR TURN'

  if (humanPlayer.isLost() || computerPlayer.isLost()) {
    playerTurn.textContent = 'GAME OVER!'
  }
}

// Clear player turn message
export function clearPlayerTurn() {
  playerTurn.textContent = ''
}

// Show error on repeat hit on same square
export function handleRepeatHit(err) {
  console.log('repeat hit')
  const error = document.createElement('p')
  error.classList.add('error')
  error.textContent = err.message

  messages.prepend(error)
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
  welcome.textContent = 'Welcome to Battleship game. Click Play to get started'
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

export function displayAIMessage() {
  const ai = document.createElement('p')
  ai.classList.add('message')
  ai.textContent = 'Game on! AI is playing in Learning mode'

  messages.prepend(ai)
}

// Notifies about the sunken ships
export function isHumanShipSunk() {
  const humanShips = humanPlayer.gameBoard.getShips()

  humanShips.forEach((ship) => {
    if (ship.isSunk() && !ship.getSunkNotified()) {
      ship.setSunkNotified(true)

      const sunk = document.createElement('p')
      sunk.classList.add('sunk', 'message')
      sunk.textContent = `Your ${ship.name} has sunk!`

      messages.prepend(sunk)

      const shipName = document.querySelector(
        `[data-name="Human ${ship.name}"]`
      )
      shipName.classList.add('strike-through')
    }
  })
}

// Notifies about the sunken ships
export function isComputerShipSunk() {
  const computerShips = computerPlayer.gameBoard.getShips()

  computerShips.forEach((ship) => {
    if (ship.isSunk() && !ship.getSunkNotified()) {
      ship.setSunkNotified(true)

      const sunk = document.createElement('p')
      sunk.classList.add('sunk', 'message')
      sunk.textContent = `Computer's ${ship.name} has sunk!`

      messages.prepend(sunk)

      const shipName = document.querySelector(
        `[data-name="Computer ${ship.name}"]`
      )
      shipName.classList.add('strike-through')
    }
  })
}

// Remove strike through from ship names
export function removeStrikeThrough() {
  const shipNames = document.querySelectorAll('.ships__item')

  shipNames.forEach((shipName) => {
    shipName.classList.remove('strike-through')
  })
}

export function showWinner() {
  if (humanPlayer.isLost()) {
    const winner = document.createElement('p')
    winner.classList.add('winner', 'message')
    winner.textContent = 'YOU LOSE. COMPUTER WINS!'

    const reset = document.createElement('p')
    reset.classList.add('message')
    reset.textContent = 'Click Reset to start a new game'

    messages.prepend(reset, winner)

    return true
  } else if (computerPlayer.isLost()) {
    const winner = document.createElement('p')
    winner.classList.add('winner', 'message')
    winner.textContent = 'COMPUTER LOST. YOU WON!'

    const reset = document.createElement('p')
    reset.classList.add('message')
    reset.textContent = 'Click Reset to start a new game'

    messages.prepend(reset, winner)

    return true
  }
}

// Disable computer game board
export function disableComputerGameBoard(container) {
  container.classList.add('disable')
}

// Enable computer game board
export function enableComputerGameBoard(container) {
  container.classList.remove('disable')
}

// Disable Reset button
export function disableResetButton() {
  resetButton.classList.add('disable')
}

// Enable Reset button
export function enableResetButton() {
  resetButton.classList.remove('disable')
}

// Disable Randomize button
export function disableRandomizeButton() {
  randomizeButton.classList.add('disable')
}

// Enable Randomize button
export function enableRandomizeButton() {
  randomizeButton.classList.remove('disable')
}

// Disable Play button
export function disablePlayButton() {
  playButton.classList.add('disable')
}

// Enable Play button
export function enablePlayButton() {
  playButton.classList.remove('disable')
}

// Clear messages from messages container
export function clearMessages() {
  messages.textContent = ''
}

// Add styling to Standard button
export function styleStandardButton() {
  standardButton.classList.add('green')
}

// Remove styling from Standard button
export function unstyleStandardButton() {
  standardButton.classList.remove('green')
}

// Add styling to Advanced button
export function styleAdvancedButton() {
  advancedButton.classList.add('green')
}

// Remove styling from Advanced button
export function unstyleAdvancedButton() {
  advancedButton.classList.remove('green')
}
