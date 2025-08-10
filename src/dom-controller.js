/* Import modules */
import {
  humanPlayer,
  computerPlayer,
  changeShipDirection,
} from './aggregator.js'

/* Get DOM elements */
export const playerTurn = document.querySelector('.player-turn')
const messages = document.querySelector('.messages__container')
const resetButton = document.querySelector('#reset')
const randomizeButton = document.querySelector('#randomize')
const playButton = document.querySelector('#play')
const standardButton = document.querySelector('#standard')
const advancedButton = document.querySelector('#advanced')

/* Renders the human player's game board */
export function renderHumanGameBoard(container, board) {
  // Reset board
  container.textContent = ''

  // Calculate square size
  let squareSize = container.offsetWidth / 10

  // Loop through the board and create a div for each cell
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const square = document.createElement('div')

      square.style.width = `${squareSize}px`
      square.style.height = `${squareSize}px`
      square.dataset.row = `${rowIndex}`
      square.dataset.column = `${columnIndex}`

      // Differentiate between ships and empty squares
      if (cell.ship) {
        square.draggable = true
        square.dataset.shipId = `${cell.ship.id}`
        square.classList.add('ship')
      } else {
        square.classList.add('cell')
      }

      // Add colors for ship hit & empty square hit
      if (cell.isHit) {
        square.className = cell.ship ? 'hit' : 'miss'
      }

      container.appendChild(square)
    })
  })
}

/* Renders the computer player's game board */
export function renderComputerGameBoard(container, board) {
  // Reset board and calculate square size
  container.textContent = ''
  const squareSize = container.offsetWidth / 10

  // Loop through the board and create a div for each cell
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const square = document.createElement('div')

      square.classList.add('cell', 'computer-cell')
      square.style.width = `${squareSize}px`
      square.style.height = `${squareSize}px`
      square.dataset.row = rowIndex
      square.dataset.column = columnIndex

      // Add colors for ship hit & empty square hit
      if (cell.isHit) {
        square.className = cell.ship ? 'hit' : 'miss'
      }

      container.appendChild(square)
    })
  })
}

/* Disables interaction with the human game board */
export function disableHumanGameBoard(container) {
  container.classList.add('disable')
}

/* Enables interaction with the human game board */
export function enableHumanGameBoard(container) {
  container.classList.remove('disable')
}

/* Disables interaction with the computer game board */
export function disableComputerGameBoard(container) {
  container.classList.add('disable')
}

/* Enables interaction with the computer game board */
export function enableComputerGameBoard(container) {
  container.classList.remove('disable')
}

/* Adds active styling to Standard button */
export function styleStandardButton() {
  standardButton.classList.add('active')
}

/* Removes active styling from Standard button */
export function unstyleStandardButton() {
  standardButton.classList.remove('active')
}

/* Adds active styling to Advanced button */
export function styleAdvancedButton() {
  advancedButton.classList.add('active')
}

/* Removes active styling from Advanced button */
export function unstyleAdvancedButton() {
  advancedButton.classList.remove('active')
}

/* Disables Randomize button */
export function disableRandomizeButton() {
  randomizeButton.classList.add('disable')
}

/* Enables Randomize button */
export function enableRandomizeButton() {
  randomizeButton.classList.remove('disable')
}

/* Disables Reset button */
export function disableResetButton() {
  resetButton.classList.add('disable')
}

/* Enables Reset button */
export function enableResetButton() {
  resetButton.classList.remove('disable')
}

/* Disables Play button */
export function disablePlayButton() {
  playButton.classList.add('disable')
}

/* Enables Play button */
export function enablePlayButton() {
  playButton.classList.remove('disable')
}

/* Initiates the drag-and-drop operation for a ship element */
export function handleDragStart(event) {
  const shipId = event.target.dataset.shipId
  const shipCells = document.querySelectorAll(`[data-ship-id="${shipId}"]`)

  shipCells.forEach((cell) => cell.classList.add('drag-ship'))

  // Store the ship ID in the drag data
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', shipId)
}

/* Removes the drag-and-drop feature from a ship element */
export function handleDragEnd(event) {
  const shipId = event.target.dataset.shipId
  const shipCells = document.querySelectorAll(`[data-ship-id="${shipId}"]`)

  shipCells.forEach((cell) => cell.classList.remove('drag-ship'))
}

/* Adds a hover effect to the target square */
export function handleDragEnter(event) {
  event.target.classList.add('target-square')
}

/* Removes hover effect from the target square */
export function handleDragLeave(event) {
  event.target.classList.remove('target-square')
}

/* Prevents the default dragover behavior and returns false to allow
   the drop event to fire */
export function handleDragOver(event) {
  event.preventDefault()
  return false
}

/* Returns the ship ID and the coordinates of the target square */
export function handleDrop(event) {
  const shipId = event.dataTransfer.getData('text/plain')
  const { row, column } = event.target.dataset
  const newCoordinates = [Number(row), Number(column)]

  return { shipId, newCoordinates }
}

/* Changes the direction of the ship with the given shipId and new
   coordinates  */
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

/* Displays the player turn message */
export function displayPlayerTurn() {
  playerTurn.textContent = 'YOUR TURN'
}

/* Updates the player turn message */
export function updatePlayerTurn() {
  playerTurn.textContent =
    playerTurn.textContent === 'YOUR TURN' ? "COMPUTER'S TURN" : 'YOUR TURN'

  // Check for either player's loss
  if (humanPlayer.isLost() || computerPlayer.isLost()) {
    playerTurn.textContent = 'GAME OVER!'
  }
}

/* Clears the player turn message */
export function clearPlayerTurn() {
  playerTurn.textContent = ''
}

/* Displays a welcome message to user */
export function displayWelcomeMessage() {
  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = 'Welcome to Battleship game. Click Play to get started'

  messages.appendChild(message)
}

/* Displays the start game message */
export function displayStartGameMessage() {
  // Legend for successful and failed shots
  const legend = document.createElement('p')
  legend.classList.add('message')
  legend.textContent = 'Legend: Orange = Miss, Red = Hit'

  // Instruction to start the game
  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = 'Your turn: Click any square on the enemy board'

  messages.prepend(message, legend)
}

/* Displays a message indicating that the computer is playing */
export function displayAIMessage() {
  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = 'Game on! Computer is playing in Learning mode'

  messages.prepend(message)
}

/* Briefly flashes the background color of the messages container */
export function flashMessagesBackground() {
  const messageBackground = messages.style.backgroundColor

  // Flash the background color
  setTimeout(() => {
    messages.style.backgroundColor = '#feee59ff'
    messages.style.transition = 'background-color 0.5s ease'
  }, 500)

  // Reset the background color
  setTimeout(() => {
    messages.style.backgroundColor = messageBackground
    messages.style.transition = 'background-color 0.5s ease'
  }, 1200)
}

/* Displays an error message on repeat hit */
export function handleRepeatHit(err) {
  const error = document.createElement('p')
  error.classList.add('error')
  error.textContent = err.message

  messages.prepend(error)
}

/* Notifies about the sunken ships on the human player's board */
export function isHumanShipSunk() {
  const ships = humanPlayer.gameBoard.getShips()

  ships.forEach((ship) => {
    if (ship.isSunk() && !ship.getSunkNotified()) {
      ship.setSunkNotified(true)

      const message = document.createElement('p')
      message.classList.add('sunk', 'message')
      message.textContent = `Your ${ship.name} has sunk!`

      messages.prepend(message)

      // Add strike through to the ship name
      const shipName = document.querySelector(
        `[data-name="Human ${ship.name}"]`
      )
      shipName.classList.add('lost')
    }
  })
}

/* Notifies about the sunken ships on the computer player's board */
export function isComputerShipSunk() {
  const ships = computerPlayer.gameBoard.getShips()

  ships.forEach((ship) => {
    if (ship.isSunk() && !ship.getSunkNotified()) {
      ship.setSunkNotified(true)

      const message = document.createElement('p')
      message.classList.add('sunk', 'message')
      message.textContent = `Computer's ${ship.name} has sunk!`

      messages.prepend(message)

      // Add strike through to the ship name
      const shipName = document.querySelector(
        `[data-name="Computer ${ship.name}"]`
      )
      shipName.classList.add('lost')
    }
  })
}

/* Displays the winner message at the end of the game */
export function displayWinner() {
  const winnerMessage = document.createElement('p')
  winnerMessage.classList.add('winner', 'message')

  // Check for either player's loss
  if (humanPlayer.isLost()) {
    winnerMessage.textContent = 'YOU LOSE. COMPUTER WINS!'

    // Add reset message
    const resetMessage = document.createElement('p')
    resetMessage.classList.add('message')
    resetMessage.textContent = 'Click Reset to start a new game'

    messages.prepend(resetMessage, winnerMessage)

    return true
  } else if (computerPlayer.isLost()) {
    winnerMessage.textContent = 'COMPUTER LOST. YOU WON!'

    // Add reset message
    const resetMessage = document.createElement('p')
    resetMessage.classList.add('message')
    resetMessage.textContent = 'Click Reset to start a new game'

    messages.prepend(resetMessage, winnerMessage)

    return true
  }
}

/* Resets all ship names to normal state */
export function resetShipNames() {
  const shipNames = document.querySelectorAll('.ships__item')

  shipNames.forEach((shipName) => {
    shipName.classList.remove('lost')
  })
}

/* Clears all messages from the messages container */
export function clearAllMessages() {
  messages.innerHTML = ''
}

/* Adds hover effect to the computer game board */
export function addHoverEffect(container) {
  const squares = container.querySelectorAll('.computer-cell')

  squares.forEach((square) => square.classList.add('hover-effect'))
}

/* Removes hover effect from the computer game board */
export function disableHoverEffect(container) {
  const squares = container.querySelectorAll('.computer-cell')

  squares.forEach((square) => square.classList.remove('hover-effect'))
}

/* Disables the standard button */
export function disableStandardButton() {
  standardButton.classList.add('disable')
}

/* Enables the standard button */
export function enableStandardButton() {
  standardButton.classList.remove('disable')
}

/* Disables the advanced button */
export function disableAdvancedButton() {
  advancedButton.classList.add('disable')
}

/* Enables the advanced button */
export function enableAdvancedButton() {
  advancedButton.classList.remove('disable')
}
