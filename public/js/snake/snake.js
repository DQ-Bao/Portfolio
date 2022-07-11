import { GRID_SIZE, outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10;
export const EXPANSION_RATE = 1;
export let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    if (outsideGrid(snakeBody[0])) {
        if (snakeBody[0].x > GRID_SIZE || snakeBody[0].x < 1)
            snakeBody[0].x = Math.abs(GRID_SIZE - snakeBody[0].x);
        if (snakeBody[0].y > GRID_SIZE || snakeBody[0].y < 1)
            snakeBody[0].y = Math.abs(GRID_SIZE - snakeBody[0].y);
    }
}
export function draw(gameBoard) {
    snakeBody.forEach( segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.style.gridRowStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement); 
    })
}
export function snakeOverlap(element, ignoreHead = false) {
    return snakeBody.some( (segment, index) => {
        if (ignoreHead && index === 0) return false;
        return element.x === segment.x && element.y === segment.y;
    })
}
export function expandSnake(amount) {
    newSegments += amount;
}
function addSegments() {
    for (let i = 0; i < newSegments; i++)
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    newSegments = 0;
}