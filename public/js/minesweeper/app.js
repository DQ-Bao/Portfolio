import { createBoard, getMarked, revealTile, TILE_STATUS } from "./minesweeper.js";

let BOARD_SIZE = { col: 9, row: 9 };
let MINE_NUM = 10;

const board = createBoard(BOARD_SIZE, MINE_NUM);
const gameBoard = document.getElementById("game-board");
const minesLeft = document.querySelector("[data-mine-count]");

board.forEach(row => {
    row.forEach(tile => {
        gameBoard.append(tile.element);
        tile.element.addEventListener("click", () => {
            revealTile(board, tile);
            checkGameOver();
        });
        tile.element.addEventListener("contextmenu", e => {
            e.preventDefault();
            getMarked(tile);
            updateMinesLeftText();
        });
    })
})

gameBoard.style.setProperty("--col-size", BOARD_SIZE.col);
gameBoard.style.setProperty("--row-size", BOARD_SIZE.row);
minesLeft.textContent = MINE_NUM;

function updateMinesLeftText() {
    minesLeft.textContent = MINE_NUM - board.reduce((count, row) => count + row.filter(tile => tile.status === TILE_STATUS.MARKED).length, 0);
}
function checkGameOver() {
    const win = () => board.every(row => row.every(tile => tile.status === TILE_STATUS.NUMBER || (tile.mine && (tile.status === TILE_STATUS.HIDDEN || tile.status === TILE_STATUS.MARKED))));
    const lose = () => board.some(row => row.some(tile => tile.status === TILE_STATUS.MINE));
    if (win() || lose()) {
        if (win()) {
            document.getElementById("subtext").textContent = "You win!";
        }
        else {
            document.getElementById("subtext").textContent = "You lose :(";
        }
        gameBoard.addEventListener("click", e => e.stopImmediatePropagation(), { capture: true });
        board.forEach(row => row.forEach(tile => {
            if (tile.status === TILE_STATUS.MARKED) getMarked(tile);
            if (tile.mine) revealTile(board, tile);
        }))
    }
}