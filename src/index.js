import './styles.css'
import {
  humanPlayer,
  computerPlayer,
  renderHumanGameBoard,
  renderComputerGameBoard,
  updatePlayerTurn,
  playerTurn,
  handleRepeatHit,
  clearErrorMessage,
  populateHumanGameBoard,
  populateComputerGameBoard,
  handleDragStart,
  handleDragEnd,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
} from './aggregator.js'

// Get DOM elements
const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')
const randomizeBtn = document.querySelector('#randomize-btn')

// On page load
document.addEventListener('DOMContentLoaded', (e) => {
  // Load human game board
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)

  // Load computer game board
  populateComputerGameBoard()
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)

  playerTurn.textContent = 'Your turn'
})

// Call makeMove() and renderComputerGameBoard() after click event on
// computerGameBoard
computerGameBoard.addEventListener('click', (e) => {
  const row = +e.target.dataset.row
  const column = +e.target.dataset.column

  try {
    humanPlayer.makeMove(computerPlayer.gameBoard, [row, column])
    renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)
    updatePlayerTurn()
    clearErrorMessage()

    // Call makeMove() and renderHumanGameBoard() after click event on
    //  computerGameBoard with 500ms delay
    setTimeout(() => {
      computerPlayer.makeMove(humanPlayer.gameBoard)
      renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
      updatePlayerTurn()
    }, 500)
  } catch (err) {
    handleRepeatHit(err)
  }
})

// Event listener for randomize button
randomizeBtn.addEventListener('click', (e) => {
  populateHumanGameBoard(e)
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
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


