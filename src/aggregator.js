// const Ship = require('./ship')
// const GameBoard = require('./game-board')
// const Player = require('./player')

import { Ship } from './ship.js'
import { GameBoard } from './game-board.js'
import { Player } from './player.js'
import { renderHumanGameBoard, renderComputerGameBoard, updatePlayerTurn, playerTurn } from './dom-controller.js'
import {humanPlayer, computerPlayer, } from './game-controller.js'

export {Ship, GameBoard, Player, humanPlayer, computerPlayer, renderHumanGameBoard, renderComputerGameBoard, updatePlayerTurn, playerTurn }