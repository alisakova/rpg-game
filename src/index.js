import './index.scss';
import GirlWalk from './assets/female.png';

const getPressedKey = (event) => {
  if (event.key === 'Down' || event.key === 'ArrowDown') {
    return 'bottomPressed';
  }
  if (event.key === 'Up' || event.key === 'ArrowUp') {
    return 'upPressed';
  }
  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    return 'leftPressed';
  }
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    return 'rightPressed';
  }
  return '';
};

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width || 600;
const canvasHeight = canvas.height || 600;

const spriteWidth = 48;
const spriteHeight = 48;
const shots = 3;
const shift = 10;
const pressedKeys = {
  bottomPressed: false,
  upPressed: false,
  leftPressed: false,
  rightPressed: false,
};
const heroRotates = {
  bottomPressed: 0,
  upPressed: 3,
  leftPressed: 1,
  rightPressed: 2,
};
const limitPositions = {
  leftTop: -4,
  rightBottom: 556,
};

let cycle = 0;
let positionY = canvasHeight / 2 - spriteWidth / 2;
let positionX = canvasWidth / 2 - spriteHeight / 2;
let heroRotate = 0;

const keyDownHandler = (event) => {
  const pressedKey = getPressedKey(event);
  pressedKeys[pressedKey] = true;
  heroRotate = heroRotates[pressedKey];
};

const keyUpHandler = (event) => {
  const pressedKey = getPressedKey(event);
  pressedKeys[pressedKey] = false;
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const starsStartPositions = [];
const starsNumber = 20;
for (let i = 0; i < starsNumber; i += 1) {
  starsStartPositions.push({
    x: randomIntFromInterval(0, 500),
    y: randomIntFromInterval(0, 500),
  });
}

const drawStar = (xPosition, yPosition) => {
  ctx.beginPath();
  ctx.moveTo(xPosition, yPosition);
  ctx.lineTo(xPosition + 8, yPosition + 20);
  ctx.lineTo(xPosition + 25, yPosition + 20);
  ctx.lineTo(xPosition + 10, yPosition + 30);
  ctx.lineTo(xPosition + 18, yPosition + 50);
  ctx.lineTo(xPosition, yPosition + 35);
  ctx.lineTo(xPosition - 18, yPosition + 50);
  ctx.lineTo(xPosition - 10, yPosition + 30);
  ctx.lineTo(xPosition - 25, yPosition + 20);
  ctx.lineTo(xPosition - 8, yPosition + 20);
  ctx.lineTo(xPosition, yPosition);
  ctx.fillStyle = '#f3f3b2';
  ctx.fill();
};

const drawBackground = () => {
  starsStartPositions.forEach((position) => {
    drawStar(position.x, position.y);
  });
};

const img = document.createElement('img');
img.src = GirlWalk;

img.addEventListener('load', () => {
  setInterval(() => {
    if (pressedKeys.bottomPressed) {
      positionY += positionY + shift === limitPositions.rightBottom ? 0 : shift;
    }
    if (pressedKeys.upPressed) {
      positionY -= positionY - shift === limitPositions.leftTop ? 0 : shift;
    }
    if (pressedKeys.leftPressed) {
      positionX -= positionX - shift === limitPositions.leftTop ? 0 : shift;
    }
    if (pressedKeys.rightPressed) {
      positionX += positionX + shift === limitPositions.rightBottom ? 0 : shift;
    }
    if (Object.values(pressedKeys).some((value) => value)) {
      cycle = (cycle + 1) % shots;
    }
    ctx.fillStyle = '#110950';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    ctx.drawImage(
      img,
      cycle * spriteWidth,
      heroRotate * spriteHeight,
      spriteWidth,
      spriteHeight,
      positionX,
      positionY,
      spriteWidth,
      spriteHeight,
    );
  }, 120);
});
