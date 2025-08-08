/* eslint-disable no-undef */
// Import GameBoard module
import { GameBoard } from '../src/game-board'
import { Ship } from '../src/ship'

// Tests for GameBoard class
describe('GameBoard', () => {
  describe('createBoard()', () => {
    it('Returns 10 x 10 game board when called with no arguments', () => {
      const gameBoard = new GameBoard()
      const board = gameBoard.board
      expect(board.length).toBe(10)
      expect(board[0].length).toBe(10)
    })

    it('Returns 5 x 7 game board when called with custom arguments', () => {
      const gameBoard = new GameBoard(5, 7)
      const board = gameBoard.board
      expect(board.length).toBe(5)
      expect(board[0].length).toBe(7)
    })
  })

  describe('placeShip()', () => {
    let board

    // Set up a board before each test
    beforeEach(() => {
      board = new GameBoard()
    })

    it('Returns false for out of bounds coordinates', () => {
      ship = new Ship(3, 'horizontal', 'Submarine')
      expect(board.placeShip(ship, [-1, 3])).toBe(false)
      expect(board.placeShip(ship, [10, 3])).toBe(false)
      expect(board.placeShip(ship, [1, -1])).toBe(false)
      expect(board.placeShip(ship, [1, 10])).toBe(false)
    })

    it('Returns false for ship length less than or equal to 0', () => {
      const ship1 = new Ship(0, 'horizontal', 'Destroyer')
      expect(board.placeShip(ship1, [1, 3])).toBe(false)
      const ship2 = new Ship(-1, 'horizontal', 'Destroyer')
      expect(board.placeShip(ship2, [1, 3])).toBe(false)
    })

    it('Returns false for out of bounds horizontal ship', () => {
      const ship = new Ship(5, 'horizontal', 'Aircraft Carrier')

      expect(board.placeShip(ship, [2, 7])).toBe(false)
    })

    it('Returns false for out of bounds vertical ship', () => {
      const ship = new Ship(5, 'horizontal', 'Aircraft Carrier')

      expect(board.placeShip(ship, [7, 7])).toBe(false)
    })

    it('Returns false if attempting to place a ship where another ship is already located', () => {
      const ship1 = new Ship(3, 'horizontal', 'Cruiser')
      const ship2 = new Ship(3, 'horizontal', 'Submarine')
      const ship3 = new Ship(4, 'vertical', 'Battleship')

      expect(board.placeShip(ship1, [2, 3])).toBe(true)
      expect(board.placeShip(ship2, [2, 3])).toBe(false)

      expect(board.placeShip(ship3, [4, 3])).toBe(true)
      expect(board.placeShip(ship2, [4, 3])).toBe(false)
    })

    it('Returns true for a successfully placed ship', () => {
      const ship1 = new Ship(3, 'horizontal', 'Submarine')
      const ship2 = new Ship(4, 'vertical', 'Battleship')

      expect(board.placeShip(ship1, [2, 3])).toBe(true)
      expect(board.placeShip(ship2, [4, 3])).toBe(true)
    })
  })

  describe('receiveAttack()', () => {
    let board

    // Set up a board and place ship before each test
    beforeEach(() => {
      board = new GameBoard()

      // Mock placeShip function
      const mockShip = {
        isHit: false,
        hit: jest.fn(),
      }

      board.placeShip = jest.fn(() => {
        board.board[2][3].ship = mockShip
        board.board[2][4].ship = mockShip
        board.board[2][5].ship = mockShip
        board.board[2][6].ship = mockShip
      })

      board.placeShip()
    })

    // Clear mock after each test
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('Throws error if a square is hit second time', () => {
      expect(board.receiveAttack([2, 3])).toBe(true)
      expect(() => board.receiveAttack([2, 3])).toThrow(
        'You have already hit that square'
      )
    })

    it('Returns true if a ship is hit', () => {
      expect(board.receiveAttack([2, 3])).toBe(true)
      expect(board.receiveAttack([2, 4])).toBe(true)
      expect(board.receiveAttack([2, 5])).toBe(true)
      expect(board.receiveAttack([2, 6])).toBe(true)
    })

    it('Returns false if a hit misses the ship', () => {
      expect(board.receiveAttack([2, 2])).toBe(false)
      expect(board.receiveAttack([2, 7])).toBe(false)
    })

    it('Adds a missed hit to emptyCells array', () => {
      board.receiveAttack([2, 7])
      expect(board.emptyCells).toContainEqual([2, 7])
    })

    it('Checks if hit() method is being called', () => {
      // Get the square where ship is placed
      const shipSquare = board.board[2][4]

      // Mock the function hit()
      shipSquare.ship.hit = jest.fn()

      board.receiveAttack([2, 4])

      expect(shipSquare.ship.hit).toHaveBeenCalledTimes(1)
    })
  })

  describe('allShipsSunk()', () => {
    let board

    // Set up a board and place ship before each test
    beforeEach(() => {
      board = new GameBoard()

      // Mock placeShip function
      board.placeShip = jest.fn(() => board.ships.push({}))
      board.placeShip()
      board.placeShip()
    })

    // Clear mock after each test
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('Returns true if all ships are sunk', () => {
      // Mock isSunk function
      board.ships[0].isSunk = jest.fn(() => true)
      board.ships[1].isSunk = jest.fn(() => true)

      expect(board.allShipsSunk()).toBe(true)
    })

    it('Returns false if all ships are not sunk', () => {
      // Mock isSunk function
      board.ships[0].isSunk = jest.fn(() => true)
      board.ships[1].isSunk = jest.fn(() => false)

      expect(board.allShipsSunk()).toBe(false)
    })

    it('Checks if isSunk() is called on every ship', () => {
      // Mock isSunk function
      board.ships[0].isSunk = jest.fn().mockReturnValue(true)
      board.ships[1].isSunk = jest.fn().mockReturnValue(true)

      board.allShipsSunk()

      expect(board.ships[0].isSunk).toHaveBeenCalledTimes(1)
      expect(board.ships[1].isSunk).toHaveBeenCalledTimes(1)
    })

    it('Skips calling isSunk() if ship in the middle of array is not sunk', () => {
      // Place a third ship for testing purpose
      board.placeShip()

      // Mock isSunk function
      board.ships[0].isSunk = jest.fn().mockReturnValue(true)
      board.ships[1].isSunk = jest.fn().mockReturnValue(false)
      board.ships[2].isSunk = jest.fn()

      board.allShipsSunk()

      expect(board.ships[0].isSunk).toHaveBeenCalledTimes(1)
      expect(board.ships[1].isSunk).toHaveBeenCalledTimes(1)
      expect(board.ships[2].isSunk).toHaveBeenCalledTimes(0)
    })

    it('Returns true when there are no ships', () => {
      board.ships = []

      expect(board.allShipsSunk()).toBe(true)
    })
  })

  describe('resetBoard()', () => {
    it('Resets all board cells to default state', () => {
      const board = new GameBoard()
      board.board[1][1].isHit = true
      board.board[3][1].isOccupied = true
      board.board[3][0].isReserved = true
      board.board[3][2].ship = { name: 'Submarine' }
      
      board.ships[{ length: 4, direction: 'horizontal', name: 'Battleship' }, { length: 2, direction: 'vertical', name: 'Destroyer' }]
      
      board.resetBoard()

      board.board.forEach(row => {
        row.forEach(cell => {
          expect(cell.isHit).toBe(false)
          expect(cell.isOccupied).toBe(false)
          expect(cell.isReserved).toBe(false)
          expect(cell.ship).toBe(null)
          
        })
      })

      expect(board.ships).toEqual([])


    })
  })
})
