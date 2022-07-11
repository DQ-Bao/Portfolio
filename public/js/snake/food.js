import { snakeOverlap, EXPANSION_RATE, expandSnake } from "./snake.js";
import { getRandomGridPosition } from "./grid.js";
let food = getRandomGridPosition();

export function update() {
    if (snakeOverlap(food)) {
        expandSnake(EXPANSION_RATE);
        while (snakeOverlap(food))
            food = getRandomGridPosition();
    }
}
export function draw(gameBoard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.y;
    foodElement.style.gridRowStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}