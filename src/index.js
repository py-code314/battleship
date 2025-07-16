import webpackImg from './webpack.svg'
import './styles.css'

const imageDiv = document.querySelector('.image-div');
const image = document.createElement('img');
image.src = webpackImg;
image.alt = ""
image.width = 100
imageDiv.appendChild(image)

console.log("Hello World");
console.log("Remove old files");
