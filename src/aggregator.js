

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
  updateShipDirection,
} from './dom-controller.js'
import {
  humanPlayer,
  computerPlayer,
  populateHumanGameBoard,
  populateComputerGameBoard,
  changeShipDirection
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
  updateShipDirection,
  changeShipDirection
}