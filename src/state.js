let computerLevel = 'standard'
let firstClick = true
let adjacentCoordinates = []

export function setComputerLevel(level) {
  computerLevel = level
}

export function getComputerLevel() {
  return computerLevel
}

export function getFirstClick() {
  return firstClick
}

export function setFirstClick(value) {
  firstClick = value
}

export function setAdjacentCoordinates(coordinates) {
  adjacentCoordinates = coordinates
}

export function getAdjacentCoordinates() {
  return adjacentCoordinates
}
