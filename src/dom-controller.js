// Import classes
import { Ship, GameBoard, Player } from './aggregator.js'

// console.log(humanGameBoard, computerGameBoard)

// Create humanPlayer and computerPlayer
export const humanPlayer = new Player('human')
export const computerPlayer = new Player('computer')

// Place ships on human game board
function populateHumanGameBoard() {
  const shipDetails = [
    [[1, 1], 5],
    [[3, 4], 4],
    [[6, 7], 3],
    [[8, 4], 3],
    [[5, 0], 2],
  ]

  // Loop through shipDetails and place ship at specific coordinates
  shipDetails.forEach((shipDetails) => {
    const [coordinates, length] = shipDetails
    const ship = humanPlayer.gameBoard.placeShip(coordinates, length)
    console.log(ship)
  })
}

populateHumanGameBoard()

// Place ships on computer game board
function populateComputerGameBoard() {
  const shipDetails = [
    [[3, 2], 5],
    [[1, 5], 4],
    [[0, 0], 3],
    [[5, 4], 3],
    [[7, 6], 2],
  ]

  // Loop through shipDetails and place ship at specific coordinates
  shipDetails.forEach((shipDetails) => {
    const [coordinates, length] = shipDetails
    const ship = computerPlayer.gameBoard.placeShip(coordinates, length)
    console.log(ship)
  })
}

populateComputerGameBoard()

// Create human game board with default ship colors
export function renderHumanGameBoard(container, board) {
  const cellSize = container.offsetWidth / 10
 

  board.forEach((row) => {
    row.forEach((cell) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell')
      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.textContent =  cell.marker 
      
      if (cell.ship) {
        square.style.backgroundColor = 'gray'
      }

      container.appendChild(square)

    })
  })
}

// Create computer game board
export function renderComputerGameBoard(container, board) {
  const cellSize = container.offsetWidth / 10
 

  board.forEach((row) => {
    row.forEach((cell) => {
      // Create a div for each cell
      const square = document.createElement('div')
      square.classList.add('cell')
      square.style.width = `${cellSize}px`
      square.style.height = `${cellSize}px`
      square.textContent =  cell.marker 
      
      // if (cell.ship) {
      //   square.style.backgroundColor = 'gray'
      // }

      container.appendChild(square)

    })
  })
}
