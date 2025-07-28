import './dom-controller.js'
import './styles.css'
import { humanPlayer, computerPlayer, renderHumanGameBoard, renderComputerGameBoard } from './aggregator.js'

const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')


document.addEventListener('DOMContentLoaded', () => {
  renderHumanGameBoard(humanGameBoard, humanPlayer.gameBoard.board )
  renderComputerGameBoard(computerGameBoard, computerPlayer.gameBoard.board )
  
})
