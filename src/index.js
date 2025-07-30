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
  GameBoard
} from './aggregator.js'

// Get DOM elements
const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')
const randomizeBtn = document.querySelector('#randomize-btn')

// On page load
document.addEventListener('DOMContentLoaded', () => {
  // console.log('on page load')
  populateHumanGameBoard()
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)

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
randomizeBtn.addEventListener('click', () => {
  // console.log('randomize btn')
  populateHumanGameBoard()
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
})
