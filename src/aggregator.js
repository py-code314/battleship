

import { Ship } from './ship.js'
import { GameBoard } from './game-board.js'
import { Player } from './player.js'
import {
  renderHumanGameBoard,
  renderComputerGameBoard,
  updatePlayerTurn,
  playerTurn,
  handleRepeatHit,
  clearErrorMessage,
  handleDragStart,
  handleDragEnd,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
} from './dom-controller.js'
import {
  humanPlayer,
  computerPlayer,
  populateHumanGameBoard,
  populateComputerGameBoard,
} from './game-controller.js'

export {
  Ship,
  GameBoard,
  Player,
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
  handleDrop,
}