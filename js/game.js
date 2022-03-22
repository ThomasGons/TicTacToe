const squaresParent = document.getElementById("grid")
const currentSymbol = document.getElementById("currentSymbol");
const solo = document.getElementById("1p");
const multi = document.getElementById("2p");


let symbol = 0,
    end = false,
    gameMode = 2,
    lastHit = [0, 0],
    round = true;

solo.addEventListener("click", () => {
    reset();
    document.getElementById("score_p1").textContent = 0;
    document.getElementById("score_p2").textContent = 0;
    document.getElementById("numberDraw").textContent = 0;

    gameMode = 1;
    symbol = 0;
    document.getElementById("p2_name").textContent = "Computer";
    if ((Math.floor(Math.random() * 2) ? true : false) == false){
        symbol = -1;
        place(playAi());
    }
});

multi.addEventListener("click", () => {
    reset();
    document.getElementById("score_p1").textContent = 0;
    document.getElementById("score_p2").textContent = 0;
    document.getElementById("numberDraw").textContent = 0;

    gameMode = 2;
    symbol = 0;
    document.getElementById("p2_name").textContent = "Player 2";
});

async function play(cell) {
    if (end == true || round == false)
        return;
    lastHit = place(cell);
    result(lastHit);
    if (gameMode == 1 && end != true) {
        round = false;
        await sleep(Math.floor(Math.random()*(500)+250))
        lastHit = place(playAi());
        round = true;
        result(lastHit);
    }
}

function place(cell) {
    let img = document.createElement('img');
    let index = Array.prototype.indexOf.call(squares, cell);
    let x = Math.floor(index / size.value),
        y = index % size.value;
    if (grid[x][y])
    return;
    if (symbol % 2 == 0) {
        img.setAttribute('src', "img/circle.png");
        grid[x][y] = 1;
    } else if (symbol % 2 == 1) {
        img.setAttribute('src', "img/cross.png");
        grid[x][y] = 2;
    }
    img.setAttribute('width', 0.72 * cell.offsetWidth);
    cell.appendChild(img);
    refreshSymbol();
    symbol++;
    return [x, y];
}

function refreshSymbol() {
    symbol % 2 == 1 ? currentSymbol.setAttribute('src', 'img/circle.png'):
    currentSymbol.setAttribute('src', 'img/cross.png');
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
                console.log(length)
            }
            if (length == document.getElementById("alignmentLength").value){
                x = store[0];
                y = store[1];
                for (let i = 0; i < length; i++){
                    squaresParent.children[x * size.value + y].style.backgroundColor = "#ddd"
                    x += moveSet[k][0] * sign;
                    y += moveSet[k][1] * sign;
                }
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

function playAi() {
    let x = Math.floor(Math.random() * size.value),
        y = Math.floor(Math.random() * size.value);
    while (grid[x][y]) {
        x = Math.floor(Math.random() * size.value);
        y = Math.floor(Math.random() * size.value);
    }
    return squaresParent.children[x * size.value + y];
}

function result(coord) {
    if (outcome(coord[0], coord[1])) {
        if (grid[coord[0]][coord[1]] == 1) {
            openPopup("Player 1 won !");
            document.getElementById("score_p1").textContent++;
        } else if (grid[coord[0]][coord[1]] == 2) {
            openPopup(document.getElementById("p2_name").textContent +" won !");
            document.getElementById("score_p2").textContent++;
        }
        end = true;
        symbol = 0;
        round = true;
        refreshSymbol();
    }
    if (symbol == size.value * size.value) {
        openPopup("There is a draw");
        document.getElementById("numberDraw").textContent++;
        end = true;
        symbol = 0;
        round = true;
        refreshSymbol();
    }
}