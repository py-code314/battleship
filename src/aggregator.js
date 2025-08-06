

import { Ship } from './ship.js'
import { GameBoard } from './game-board.js'
import { Player } from './player.js'
import {
  renderHumanGameBoard,
  renderComputerGameBoard,
  displayPlayerTurn,
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
  displayWelcomeMessage,
  displayStartGameMessage,
  animateMessages,
} from './dom-controller.js'
import {
  humanPlayer,
  computerPlayer,
  populateHumanGameBoard,
  populateComputerGameBoard,
  changeShipDirection,
  generateAdjacentShipCoordinates,
  generateRandomCoordinates,
  
} from './game-controller.js'

export {
  Ship,
  GameBoard,
  Player,
  humanPlayer,
  computerPlayer,
  renderHumanGameBoard,
  renderComputerGameBoard,
  displayPlayerTurn,
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
  changeShipDirection,
  generateAdjacentShipCoordinates,
  generateRandomCoordinates,
  displayWelcomeMessage,
  displayStartGameMessage,
  animateMessages,
}