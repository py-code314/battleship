/* Import style sheet */
import './styles.css'

/* Import classes and functions */
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

/* Get DOM elements */
const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')
const instructionsButton = document.querySelector('#instructions')
const instructionsModal = document.querySelector('#instructions-modal')
const closeButton = document.querySelector('#close-btn')
const computerLevels = document.querySelector('.computer__levels')
const randomizeButton = document.querySelector('#randomize')
const resetButton = document.querySelector('#reset')
const playButton = document.querySelector('#play')

/* EVENT LISTENERS */

/* DOMContentLoaded event listener */
document.addEventListener('DOMContentLoaded', (e) => {
  // Load human game board
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)

  // Load computer game board
  populateComputerGameBoard()
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
  disableComputerGameBoard(computerGameBoard)

  // Set up initial button states and display messages
  styleStandardButton()
  disableResetButton()
  displayWelcomeMessage()
  flashMessagesBackground()
})

/* Keydown event listener */
document.addEventListener('keydown', (event) => {
  // Close instructions modal on 'Escape'
  if (event.key === 'Escape') {
    instructionsModal.close()
  }
})

/* Click event listener to change computer level */
computerLevels.addEventListener('click', (e) => {
  if (e.target.id === 'standard') {
    // Set computer level and style buttons
    setComputerLevel('standard')
    styleStandardButton()
    unstyleAdvancedButton()
  } else if (e.target.id === 'advanced') {
    // Set computer level and style buttons
    setComputerLevel('advanced')
    styleAdvancedButton()
    unstyleStandardButton()
  }
})

/* Click event listener for game play on computer game board */
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
        // Get adjacent coordinates
        let adjacentCoordinates = getAdjacentCoordinates()

        // Check if there are any adjacent coordinates
        if (adjacentCoordinates.length) {
          // Call makeMove with the first adjacent coordinate
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
          // If no adjacent coordinates, call makeMove with a random coordinate
          const hitShip = computerPlayer.makeMove(
            humanPlayer.gameBoard,
            randomCoordinates
          )

          // Update adjacentCoordinates after a successful hit
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

/* Drag and Drop event listeners */
humanGameBoard.addEventListener('dragstart', (event) => {
  if (event.target.classList.contains('ship')) {
    handleDragStart(event)
  }
})

humanGameBoard.addEventListener('dragend', (event) => {
  if (event.target.classList.contains('ship')) {
    handleDragEnd(event)
  }
})

humanGameBoard.addEventListener('dragenter', (event) => {
  if (event.target.classList.contains('cell')) {
    handleDragEnter(event)
  }
})

humanGameBoard.addEventListener('dragleave', (event) => {
  if (event.target.classList.contains('cell')) {
    handleDragLeave(event)
  }
})

humanGameBoard.addEventListener('dragover', (event) => {
  if (event.target.classList.contains('cell')) {
    handleDragOver(event)
  }
})

humanGameBoard.addEventListener('drop', (event) => {
  if (event.target.classList.contains('cell')) {
    populateHumanGameBoard(event)
    renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
  }
})

/* Click event listener to change ship direction */
humanGameBoard.addEventListener('click', (event) => {
  updateShipDirection(event)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
})

/* Event listener to open instructions */
instructionsButton.addEventListener('click', () => {
  instructionsModal.showModal()
})

/* Event listener to close instructions */
closeButton.addEventListener('click', () => {
  instructionsModal.close()
})

/* Event listener to randomize ships placement on board */
randomizeButton.addEventListener('click', (event) => {
  populateHumanGameBoard(event)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
})

/* Event listener to start the game */
playButton.addEventListener('click', () => {
  // Set up game boards
  disableHumanGameBoard(humanGameBoard)
  enableComputerGameBoard(computerGameBoard)
  addHoverEffect(computerGameBoard)

  // Manage button states
  disableStandardButton()
  disableAdvancedButton()
  disablePlayButton()
  enableResetButton()
  disableRandomizeButton()

  // Display messages
  displayPlayerTurn()
  displayStartGameMessage()
})

/* Event listener to reset the game */
resetButton.addEventListener('click', (event) => {
  // Reset human game board
  populateHumanGameBoard(event)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
  enableHumanGameBoard(humanGameBoard)

  // Reset computer game board
  populateComputerGameBoard()
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
  disableComputerGameBoard(computerGameBoard)

  // Manage button states
  enableStandardButton()
  enableAdvancedButton()
  styleStandardButton()
  unstyleAdvancedButton()
  enablePlayButton()
  enableRandomizeButton()
  disableResetButton()

  // Set computer level to standard
  setComputerLevel('standard')

  // Reset messages
  clearPlayerTurn()
  clearAllMessages()
  resetShipNames()
  displayWelcomeMessage()
  flashMessagesBackground()
})
