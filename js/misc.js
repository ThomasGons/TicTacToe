let mode = document.getElementById("1p");

alignment.addEventListener('change', () => {
    document.getElementById("alignmentLabel").textContent = "Alignment: " + alignment.value;
    reset();
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === "Backspace")
        clean();
})


function reset(){
    clean();
    grid = [];
    for (i = 0; i < size.value; i++){
        grid.push([]);
        for (j = 0; j < size.value; j++)
            grid[i].push(0);
    }
}


function clean() {
    squares.forEach(cell => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "black";
    });
    grid = []
    for (i = 0; i < size.value; i++){
        grid.push([]);
        for (j = 0; j < size.value; j++)
            grid[i].push(0);
    }
    symbol = 0;
    end = false
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}