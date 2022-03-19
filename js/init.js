

let size = document.getElementById("size");
let gameBoard = document.getElementById("grid");
let squares = document.querySelectorAll(".square");
let alignment = document.getElementById("alignmentLength");
let grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

squares.forEach(cell => {
    cell.addEventListener('mouseover', play(cell))
});

size.addEventListener('change', () => {
    // empty grid and remove event
    squares.forEach(cell => {
        cell.removeEventListener('mouseover', play)
    }, {once:true});
    grid = [];
    symbol = 0;
    gameBoard.innerHTML = "";
    
    // re-init the grid with the new size 
    let i = 0, j = 0;
    for (i = 0; i < size.value; i++){
        for (j = 0; j < size.value; j++){
            let cell = document.createElement('div');
            cell.setAttribute('class', 'square');
            cell.style.setProperty('width', ((40 - 0.125 * (Number(size.value) + 1)) / size.value)+'em');
            cell.style.setProperty('height', ((40 - 0.125 * (Number(size.value) + 1)) / size.value)+'em');
            play(cell)
            gameBoard.appendChild(cell);
        }
    }
    gameBoard.style.setProperty('grid-template-columns', 'repeat(' + size.value + ', auto)');
    document.getElementById("sizeLabel").textContent = "Size: " + size.value;
    
    for (i = 0; i < size.value; i++){
        grid.push([]);
        for (j = 0; j < size.value; j++)
            grid[i].push(0);
    }
    squares = document.querySelectorAll(".square");

    if (Number(alignment.value) > Number(size.value))
        document.getElementById("alignmentLabel").textContent = "Alignment: " + size.value;
    alignment.setAttribute('max', size.value);
    
})