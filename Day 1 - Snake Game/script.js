const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const scoreDisplay = document.getElementById("score");

canvas.width = 900;
canvas.height = 500;

const box = 20; 

let snake = [
    { x: 200, y: 200 }, 
    { x: 180, y: 200 },  
    { x: 160, y: 200 }   ]

let food = { x: 100, y: 100 };
let direction = "RIGHT";
let score = 0;
let gameRunning = false;
let gameInterval;


function drawSnake() {
    ctx.font = "25px Arial"; 
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center";

    snake.forEach((segment, index) => {
        let centerX = segment.x + box / 2;
        let centerY = segment.y + box / 2;

        if (index === 0) {
            ctx.fillText("🐸", centerX, centerY); 
        } else {
            ctx.fillText("🟢", centerX, centerY); 
        }
    });
}

function drawFood() {
    ctx.font = "25px Arial"; 
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center";

    let centerX = food.x + box / 2;
    let centerY = food.y + box / 2;

    ctx.fillText("🍎", centerX, centerY);
}


function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

   
    snake.unshift(head);

   
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    let head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function updateGame() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gameInterval = setInterval(updateGame, 200); 
    }
}

function pauseGame() {
    gameRunning = false;
    clearInterval(gameInterval);
}

function gameOver() {
    alert("Game Over! Your Score: " + score);
    clearInterval(gameInterval);
    location.reload();
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
