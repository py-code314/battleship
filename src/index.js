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
  flashMessagesBackground,
  displayAIMessage,
  isHumanShipSunk,
  isComputerShipSunk,
  displayWinner,
  disableComputerGameBoard,
  enableComputerGameBoard,
  disableResetButton,
  enableResetButton,
  disableRandomizeButton,
  enableRandomizeButton,
  disablePlayButton,
  enablePlayButton,
  clearAllMessages,
  resetShipNames,
  clearPlayerTurn,
  styleStandardButton,
  unstyleStandardButton,
  styleAdvancedButton,
  unstyleAdvancedButton,
  addHoverEffect,
  disableHoverEffect,
  enableHumanGameBoard,
  disableHumanGameBoard,
  disableStandardButton,
  enableStandardButton,
  disableAdvancedButton,
  enableAdvancedButton,
  setComputerLevel,
  getComputerLevel,
  getFirstClick,
  setFirstClick,
  getAdjacentCoordinates,
  setAdjacentCoordinates,
} from './aggregator.js'

// Get DOM elements
const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')
const randomizeButton = document.querySelector('#randomize')
const resetButton = document.querySelector('#reset')
const playButton = document.querySelector('#play')
const instructionsButton = document.querySelector('#instructions')
const closeButton = document.querySelector('#close-btn')
const instructionsModal = document.querySelector('#instructions-modal')
const computerLevels = document.querySelector('.computer__levels')

// let computerLevel = 'standard'
// let firstClick = true
// let adjacentCoordinates = []

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
  flashMessagesBackground()

  disableResetButton()
  styleStandardButton()
})

// Add code for Esc key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    instructionsModal.close()
  }
})

computerLevels.addEventListener('click', (e) => {
  if (e.target.id === 'standard') {
    setComputerLevel('standard')
    styleStandardButton()
    unstyleAdvancedButton()
  } else if (e.target.id === 'advanced') {
    setComputerLevel('advanced')
    styleAdvancedButton()
    unstyleStandardButton()
  }
})

// computerLevels.addEventListener('click', (e) => {
//   if (e.target.id === 'standard') {
//     computerLevel = 'standard'
//     styleStandardButton()
//     unstyleAdvancedButton()
//   } else if (e.target.id === 'advanced') {
//     computerLevel = 'advanced'
//     styleAdvancedButton()
//     unstyleStandardButton()
//   }
// })

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
    if (getFirstClick()) {
      displayAIMessage()
      setFirstClick(false)
    }

    // if (firstClick) {
    //   displayAIMessage()
    //   firstClick = false
    // }
    isComputerShipSunk()

    // Computer play
    const randomCoordinates = generateRandomCoordinates(humanPlayer.gameBoard)

    setTimeout(() => {
      const computerLevel = getComputerLevel()

      // Standard level
      if (computerLevel === 'standard') {
        computerPlayer.makeMove(humanPlayer.gameBoard, randomCoordinates)
      } else if (computerLevel === 'advanced') {
        // Advanced level
        // If any ship got hit
        let adjacentCoordinates = getAdjacentCoordinates()

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
            setAdjacentCoordinates(adjacentCoordinates)
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

            setAdjacentCoordinates(adjacentCoordinates)
          }
        }
      }

      renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
      updatePlayerTurn()
      isHumanShipSunk()
      const winner = displayWinner()
      if (winner) {
        disableComputerGameBoard(computerGameBoard)
        disableHoverEffect(computerGameBoard)
      }
    }, 300)
  } catch (err) {
    handleRepeatHit(err)
  }
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

// Event listeners to show and close instructions dialog
instructionsButton.addEventListener('click', () => {
  instructionsModal.showModal()
})

closeButton.addEventListener('click', () => {
  instructionsModal.close()
})

// Event listener for randomize button
randomizeButton.addEventListener('click', (e) => {
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
})

playButton.addEventListener('click', () => {
  displayStartGameMessage()
  displayPlayerTurn()

  enableComputerGameBoard(computerGameBoard)
  disableHumanGameBoard(humanGameBoard)

  disablePlayButton()
  enableResetButton()
  disableRandomizeButton()
  disableStandardButton()
  disableAdvancedButton()
  addHoverEffect(computerGameBoard)
})

// Reset the page
resetButton.addEventListener('click', (e) => {
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
  enableHumanGameBoard(humanGameBoard)

  populateComputerGameBoard()
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
  disableComputerGameBoard(computerGameBoard)
  clearAllMessages()
  displayWelcomeMessage()
  flashMessagesBackground()

  enablePlayButton()
  enableRandomizeButton()
  disableResetButton()
  enableStandardButton()
  enableAdvancedButton()
  resetShipNames()
  clearPlayerTurn()

  styleStandardButton()
  unstyleAdvancedButton()
  setComputerLevel('standard')
})
