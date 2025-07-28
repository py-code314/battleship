import './dom-controller.js'
import './styles.css'
import { humanPlayer, computerPlayer, renderHumanGameBoard, renderComputerGameBoard } from './aggregator.js'

// Get board containers
const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')


// On page load
document.addEventListener('DOMContentLoaded', () => {
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board )
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board )
  
})

// Call makeMove() and renderComputerGameBoard() after click event on
// computerGameBoard
computerGameBoard.addEventListener('click', (e) => {
  const row = e.target.dataset.row
  const column = e.target.dataset.column

  humanPlayer.makeMove(computerPlayer.gameBoard, [row, column])
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board)

  // Call makeMove() and renderHumanGameBoard() after click event on
  //  computerGameBoard with 500ms delay
  setTimeout(() => {
    computerPlayer.makeMove(humanPlayer.gameBoard)
    renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board)
  }, 500)
})






// Click event on board, get the coordinates
// Call makeMove()
// Change  color of square