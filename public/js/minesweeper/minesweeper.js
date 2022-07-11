export const TILE_STATUS = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked"
}

export function createBoard(boardSize, mineNum) {
    const board = [];
    const minesPosition = getMinesPosition(boardSize, mineNum);
    for (let x = 0; x < boardSize.row; x++) {
        const row = [];
        for (let y = 0; y < boardSize.col; y++) {
            const element = document.createElement("div")
            element.dataset.status = TILE_STATUS.HIDDEN;
            const tile = {
                element,
                x,
                y,
                mine: minesPosition.some(p => p.x === x && p.y === y),
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                }
            }
            row.push(tile)
        }
        board.push(row);
    }
    return board;
}

export function getMarked(tile) {
    if (tile.status !== TILE_STATUS.HIDDEN && tile.status !== TILE_STATUS.MARKED) return;
    if (tile.status === TILE_STATUS.MARKED) tile.status = TILE_STATUS.HIDDEN;
    else tile.status = TILE_STATUS.MARKED;
}

export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUS.HIDDEN) return;
    if (tile.mine) {
        tile.status = TILE_STATUS.MINE;
        return;
    }
    tile.status = TILE_STATUS.NUMBER;
    const surroundTiles = nearbyTiles(board, tile);
    const mines = surroundTiles.filter(t => t.mine);
    if (mines.length === 0) {
        surroundTiles.forEach(t => revealTile(board, t));
    }
    else {
        tile.element.textContent = mines.length;
    }
}

function getMinesPosition(boardSize, mineNum) {
    const positions = [];
    while (positions.length < mineNum) {
        const position = {
            x: Math.floor(Math.random() * boardSize.row),
            y: Math.floor(Math.random() * boardSize.col),
        }
        if (!positions.some(p => p.x === position.x && p.y === position.y)) {
            positions.push(position);
        }
    }
    return positions;
}

function nearbyTiles(board, { x, y }) {
    const tiles = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const tile = board[x + xOffset]?.[y + yOffset];
            if (tile) tiles.push(tile);
        }
    }
    return tiles;
}