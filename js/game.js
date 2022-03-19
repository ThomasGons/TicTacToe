const squaresParent = document.getElementById("grid")
const currentSymbol = document.getElementById("currentSymbol");

let symbol = 0, end = false;

function play(cell) {
    cell.addEventListener('click', () => {
        let img = document.createElement('img');
        let index = Array.prototype.indexOf.call(squares, cell);
        let x = Math.floor(index / size.value),
            y = index % size.value;
        if (grid[x][y] || end)
            return;
        if (symbol % 2) {
            img.setAttribute('src', "img/circle.png");
            img.setAttribute('width', 0.75 * cell.offsetWidth);
            grid[x][y] = 1;
            currentSymbol.setAttribute('src', 'img/cross.png');
        } else {
            img.setAttribute('src', "img/cross.png");
            img.setAttribute('width', 0.7 * cell.offsetWidth);
            grid[x][y] = 2;
            currentSymbol.setAttribute('src', 'img/circle.png');
        }
        cell.appendChild(img);
        if (outcome(x, y)) {
            if (symbol % 2){
                openPopup("Player 1 won !");
                document.getElementById("p1").textContent++;
            } else {
                openPopup("Player 1 won !");
                document.getElementById("p2").textContent++;
            }
            end = true;
        }
        symbol++;
        if (symbol == size.value * size.value){
            openPopup("There is a draw");
            document.getElementById("draw").textContent++;
            end = true;
        }
    });
}

const moveSet = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1]
];

function outcome(x, y) {
    let store = [x, y];
    let sign = -1;
    for (k = 0; k < 4; k++) {
        let length = 1;
        for (sign = -1; sign <= 1; sign += 2) {
            while (!indexError(x, y, moveSet[k][0] * sign, moveSet[k][1] * sign) &&
                grid[x][y] == grid[x + moveSet[k][0] * sign][y + moveSet[k][1] * sign]) {
                x += moveSet[k][0] * sign;
                y += moveSet[k][1] * sign;
                length++;
            }
            if (length == document.getElementById("alignmentLength").value){

                return 1;
            }
            x = store[0];
            y = store[1];
        }
    }
    return 0;
}

function indexError(x, y, dx, dy) {
    return (x + dx >= size.value || x + dx < 0 || y + dy >= size.value || y + dy < 0) ? true : false
}