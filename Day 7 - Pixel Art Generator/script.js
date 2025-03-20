const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const gridWidthInput = document.getElementById("gridWidth");
const gridHeightInput = document.getElementById("gridHeight");

function createGrid(width, height) {
    grid.innerHTML = ""; // Clear existing grid
    grid.style.gridTemplateColumns = `repeat(${width}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${height}, 20px)`;
    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => {
            if (cell.style.backgroundColor === "" || cell.style.backgroundColor === "white" || cell.style.backgroundColor === "rgb(255, 255, 255)") {
                cell.style.backgroundColor = colorPicker.value;
            } else {
                cell.style.backgroundColor = "white"; // Reset color
            }
        });
        grid.appendChild(cell);
    }
}

function clearGrid() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

function updateGrid() {
    const width = parseInt(gridWidthInput.value);
    const height = parseInt(gridHeightInput.value);
    createGrid(width, height);
}

createGrid(16, 16); 