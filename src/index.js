import './dom-controller.js'
import './styles.css'
import { initializeDefaultGrid } from './aggregator.js'

const humanGameBoard = document.querySelector('#human-board')
const computerGameBoard = document.querySelector('#computer-board')


document.addEventListener('DOMcontentLoaded', initializeDefaultGrid(humanGameBoard))
document.addEventListener('DOMcontentLoaded', initializeDefaultGrid(computerGameBoard))