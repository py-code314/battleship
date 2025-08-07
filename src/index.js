import './styles.css'
import {
  humanPlayer,
  computerPlayer,
  renderHumanGameBoard,
  renderComputerGameBoard,
  displayPlayerTurn,
  updatePlayerTurn,
  handleRepeatHit,
  populateHumanGameBoard,
  populateComputerGameBoard,
  handleDragStart,
  handleDragEnd,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  updateShipDirection,
  generateRandomCoordinates,
  generateAdjacentShipCoordinates,
  displayWelcomeMessage,
  displayStartGameMessage,
  animateMessages,
  displayAIMessage,
  isHumanShipSunk,
  isComputerShipSunk,
  showWinner,
  disableComputerGameBoard,
  enableComputerGameBoard,
  disableResetButton,
  enableResetButton,
  disableRandomizeButton,
  enableRandomizeButton,
  disablePlayButton,
  enablePlayButton,
  clearMessages,
  removeStrikeThrough,
  clearPlayerTurn,
} from './aggregator.js'

// Get DOM elements
const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')
const randomizeBtn = document.querySelector('#randomize')
const resetBtn = document.querySelector('#reset')
const playBtn = document.querySelector('#play')

// On page load
document.addEventListener('DOMContentLoaded', (e) => {
  // Load human game board
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)

  // Load computer game board
  populateComputerGameBoard()
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
  disableComputerGameBoard(computerGameBoard)
  displayWelcomeMessage()
  animateMessages()

  disableResetButton()
})

playBtn.addEventListener('click', () => {
  displayStartGameMessage()
  displayPlayerTurn()
  enableComputerGameBoard(computerGameBoard)

  disablePlayButton()
  enableResetButton()
  disableRandomizeButton()
})

let computerLevel = 'standard'
const computerLevels = document.querySelector('.computer__levels')
computerLevels.addEventListener('click', (e) => {
  if (e.target.id === 'standard') {
    computerLevel = 'standard'
  } else if (e.target.id === 'advanced') {
    computerLevel = 'advanced'
  }
})

let adjacentCoordinates = []
let firstClick = true
// Call makeMove() and renderComputerGameBoard() after click event on
// computerGameBoard
computerGameBoard.addEventListener('click', (e) => {
  const row = +e.target.dataset.row
  const column = +e.target.dataset.column
  const coordinates = [row, column]

  try {
    // Human play
    humanPlayer.makeMove(computerPlayer.gameBoard, coordinates)

    renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
    updatePlayerTurn()
    if (firstClick) {
      displayAIMessage()
      firstClick = false
    }
    isComputerShipSunk()

    // Computer play
    const randomCoordinates = generateRandomCoordinates(humanPlayer.gameBoard)

    setTimeout(() => {
      // Standard level
      if (computerLevel === 'standard') {
        computerPlayer.makeMove(humanPlayer.gameBoard, randomCoordinates)
      } else if (computerLevel === 'advanced') {
        // Advanced level
        // If any ship got hit
        if (adjacentCoordinates.length) {
          const hitCoordinates = adjacentCoordinates.shift()
          const hitShip = computerPlayer.makeMove(
            humanPlayer.gameBoard,
            hitCoordinates
          )
          // Update adjacentCoordinates after a successful hit
          if (hitShip) {
            adjacentCoordinates = generateAdjacentShipCoordinates(
              humanPlayer.gameBoard,
              hitCoordinates
            )
          }
        } else {
          // Any ship is not hit
          const hitShip = computerPlayer.makeMove(
            humanPlayer.gameBoard,
            randomCoordinates
          )

          if (hitShip) {
            adjacentCoordinates = generateAdjacentShipCoordinates(
              humanPlayer.gameBoard,
              randomCoordinates
            )
          }
        }
      }

      renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
      updatePlayerTurn()
      isHumanShipSunk()
      const winner = showWinner()
      if (winner) {
        disableComputerGameBoard(computerGameBoard)
      }
    }, 300)
  } catch (err) {
    handleRepeatHit(err)
  }
})

// Event listener for randomize button
randomizeBtn.addEventListener('click', (e) => {
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
})

// Reset the page
resetBtn.addEventListener('click', (e) => {
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)

  populateComputerGameBoard()
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
  disableComputerGameBoard(computerGameBoard)
  clearMessages()
  displayWelcomeMessage()
  animateMessages()

  enablePlayButton()
  enableRandomizeButton()
  disableResetButton()
  removeStrikeThrough()
  clearPlayerTurn()
})

// Event listeners for moving a ship
humanGameBoard.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('ship')) {
    handleDragStart(e)
  }
})

humanGameBoard.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('ship')) {
    handleDragEnd(e)
  }
})

humanGameBoard.addEventListener('dragenter', (e) => {
  if (e.target.classList.contains('cell')) {
    handleDragEnter(e)
  }
})

humanGameBoard.addEventListener('dragleave', (e) => {
  if (e.target.classList.contains('cell')) {
    handleDragLeave(e)
  }
})

humanGameBoard.addEventListener('dragover', (e) => {
  if (e.target.classList.contains('cell')) {
    handleDragOver(e)
  }
})

humanGameBoard.addEventListener('drop', (e) => {
  if (e.target.classList.contains('cell')) {
    populateHumanGameBoard(e)
    renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
  }
})

humanGameBoard.addEventListener('click', (e) => {
  updateShipDirection(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
})
