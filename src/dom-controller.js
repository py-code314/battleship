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

  let squareSize = container.offsetWidth / 10

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      // Create a div for each cell
      const square = document.createElement('div')

      square.style.width = `${squareSize}px`
      square.style.height = `${squareSize}px`
      square.dataset.row = `${rowIndex}`
      square.dataset.column = `${columnIndex}`

      // Color ship
      if (cell.ship) {
        square.draggable = true
        square.dataset.shipId = `${cell.ship.id}`
        square.classList.add('ship')
      } else {
        square.classList.add('cell')
      }

      // Color ship hit & empty square hit
      if (cell.isHit) {
        square.className = cell.ship ? 'hit' : 'miss'
      }

      container.appendChild(square)
    })
  })
}

// Create computer game board
export function renderComputerGameBoard(container, board) {
  container.textContent = ''
  const squareSize = container.offsetWidth / 10

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell', 'computer-cell')
      square.style.width = `${squareSize}px`
      square.style.height = `${squareSize}px`
      square.dataset.row = rowIndex
      square.dataset.column = columnIndex

      // Color ship hit & empty square hit
      if (cell.isHit) {
        square.className = cell.ship ? 'hit' : 'miss'
      }

      container.appendChild(square)
    })
  })
}

// Disable human game board
export function disableHumanGameBoard(container) {
  container.classList.add('disable')
}

// Enable human game board
export function enableHumanGameBoard(container) {
  container.classList.remove('disable')
}

// Disable computer game board
export function disableComputerGameBoard(container) {
  container.classList.add('disable')
}

// Enable computer game board
export function enableComputerGameBoard(container) {
  container.classList.remove('disable')
}

// Add styling to Standard button
export function styleStandardButton() {
  standardButton.classList.add('active')
}

// Remove styling from Standard button
export function unstyleStandardButton() {
  standardButton.classList.remove('active')
}

// Add styling to Advanced button
export function styleAdvancedButton() {
  advancedButton.classList.add('active')
}

// Remove styling from Advanced button
export function unstyleAdvancedButton() {
  advancedButton.classList.remove('active')
}

// Disable Randomize button
export function disableRandomizeButton() {
  randomizeButton.classList.add('disable')
}

// Enable Randomize button
export function enableRandomizeButton() {
  randomizeButton.classList.remove('disable')
}

// Disable Reset button
export function disableResetButton() {
  resetButton.classList.add('disable')
}

// Enable Reset button
export function enableResetButton() {
  resetButton.classList.remove('disable')
}

// Disable Play button
export function disablePlayButton() {
  playButton.classList.add('disable')
}

// Enable Play button
export function enablePlayButton() {
  playButton.classList.remove('disable')
}

// Make ship cells draggable
export function handleDragStart(event) {
  const shipId = event.target.dataset.shipId
  const shipCells = document.querySelectorAll(`[data-ship-id="${shipId}"]`)

  shipCells.forEach((cell) => cell.classList.add('drag-ship'))

  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', shipId)
}

// Reset ship cells after drag ends
export function handleDragEnd(event) {
  const shipId = event.target.dataset.shipId
  const shipCells = document.querySelectorAll(`[data-ship-id="${shipId}"]`)

  shipCells.forEach((cell) => cell.classList.remove('drag-ship'))
}

// Highlight cell when a ship is dragged over
export function handleDragEnter(event) {
  event.target.classList.add('target-square')
}

export function handleDragLeave(event) {
  event.target.classList.remove('target-square')
}

export function handleDragOver(event) {
  event.preventDefault()
  return false
}

// Return ship ID and new coordinates when a ship is dropped
export function handleDrop(event) {
  const shipId = event.dataTransfer.getData('text/plain')
  const { row, column } = event.target.dataset
  const newCoordinates = [Number(row), Number(column)]

  return { shipId, newCoordinates }
}

export function updateShipDirection(event) {
  if (event.target.classList.contains('ship')) {
    const shipId = event.target.dataset.shipId
    const newCoordinates = [
      Number(event.target.dataset.row),
      Number(event.target.dataset.column),
    ]

    changeShipDirection(shipId, newCoordinates)
  }
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

export function displayWelcomeMessage() {
  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = 'Welcome to Battleship game. Click Play to get started'

  messages.appendChild(message)
}

export function displayStartGameMessage() {
  const legend = document.createElement('p')
  legend.classList.add('message')
  legend.textContent = 'Legend: Orange = Miss, Red = Hit'

  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = 'Your turn: Click any square on the enemy board'

  messages.prepend(message, legend)
}

export function displayAIMessage() {
  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = 'Game on! Computer is playing in Learning mode'

  messages.prepend(message)
}

export function flashMessagesBackground() {
  const messageBackground = messages.style.backgroundColor

  setTimeout(() => {
    messages.style.backgroundColor = '#feee59ff'
    messages.style.transition = 'background-color 0.5s ease'
  }, 500)

  setTimeout(() => {
    messages.style.backgroundColor = messageBackground
    messages.style.transition = 'background-color 0.5s ease'
  }, 1200)
}

// Show error on repeat hit on same square
export function handleRepeatHit(err) {
  const error = document.createElement('p')
  error.classList.add('error')
  error.textContent = err.message

  messages.prepend(error)
}

// Notifies about the sunken ships
export function isHumanShipSunk() {
  const ships = humanPlayer.gameBoard.getShips()

  ships.forEach((ship) => {
    if (ship.isSunk() && !ship.getSunkNotified()) {
      ship.setSunkNotified(true)

      const message = document.createElement('p')
      message.classList.add('sunk', 'message')
      message.textContent = `Your ${ship.name} has sunk!`

      messages.prepend(message)

      const shipName = document.querySelector(
        `[data-name="Human ${ship.name}"]`
      )
      shipName.classList.add('lost')
    }
  })
}

// Notifies about the sunken ships
export function isComputerShipSunk() {
  const ships = computerPlayer.gameBoard.getShips()

  ships.forEach((ship) => {
    if (ship.isSunk() && !ship.getSunkNotified()) {
      ship.setSunkNotified(true)

      const message = document.createElement('p')
      message.classList.add('sunk', 'message')
      message.textContent = `Computer's ${ship.name} has sunk!`

      messages.prepend(message)

      const shipName = document.querySelector(
        `[data-name="Computer ${ship.name}"]`
      )
      shipName.classList.add('lost')
    }
  })
}

export function displayWinner() {
  const winnerMessage = document.createElement('p')
  winnerMessage.classList.add('winner', 'message')

  if (humanPlayer.isLost()) {
    winnerMessage.textContent = 'YOU LOSE. COMPUTER WINS!'

    const resetMessage = document.createElement('p')
    resetMessage.classList.add('message')
    resetMessage.textContent = 'Click Reset to start a new game'

    messages.prepend(resetMessage, winnerMessage)

    return true
  } else if (computerPlayer.isLost()) {
    winnerMessage.textContent = 'COMPUTER LOST. YOU WON!'

    const resetMessage = document.createElement('p')
    resetMessage.classList.add('message')
    resetMessage.textContent = 'Click Reset to start a new game'

    messages.prepend(resetMessage, winnerMessage)

    return true
  }
}

// Remove strike through from ship names
export function resetShipNames() {
  const shipNames = document.querySelectorAll('.ships__item')

  shipNames.forEach((shipName) => {
    shipName.classList.remove('lost')
  })
}

// Clear all messages from the messages container
export function clearAllMessages() {
  messages.innerHTML = ''
}

// Add hover effect for enemy board squares
export function addHoverEffect(container) {
  const squares = container.querySelectorAll('.computer-cell')

  squares.forEach((square) => square.classList.add('hover-effect'))
}

// Disable hover effect
export function disableHoverEffect(container) {
  const squares = container.querySelectorAll('.computer-cell')

  squares.forEach((square) => square.classList.remove('hover-effect'))
}

// Disable Standard button
export function disableStandardButton() {
  standardButton.classList.add('disable')
}

// Enable Standard button
export function enableStandardButton() {
  standardButton.classList.remove('disable')
}

// Disable Advanced button
export function disableAdvancedButton() {
  advancedButton.classList.add('disable')
}

// Enable Advanced button
export function enableAdvancedButton() {
  advancedButton.classList.remove('disable')
}
