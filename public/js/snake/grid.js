export const GRID_SIZE = 21;
export function getRandomGridPosition() {
    return {
        x: Math.floor(Math.random() * 21 + 1),
        y: Math.floor(Math.random() * 21 + 1)
    }
}
export function outsideGrid(element) {
    return element.x < 1 ||
           element.x > GRID_SIZE ||
           element.y < 1 ||
           element.y > GRID_SIZE;
}