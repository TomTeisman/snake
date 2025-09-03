const gridSize = 40; // here we define the size of a single grid block in px
let gameIntervall;
let direction = 'RIGHT';
let snake = [
    { x: gridSize * 5, y: gridSize * 7 },
    { x: gridSize * 4, y: gridSize * 7 },
    { x: gridSize * 3, y: gridSize * 7 },
    { x: gridSize * 2, y: gridSize * 7 },
    { x: gridSize, y: gridSize * 7 },
    { x: 0, y: gridSize * 7 }
];
let candy = { x: gridSize * 12, y: gridSize * 7 };

/**
 * Add the eventlisteners for pressing keys
 */
document.addEventListener("DOMContentLoaded", function () {
    // This defines the keys we can use in the game
    const keys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'W', 'A', 'S', 'D',
        'w', 'a', 's', 'd'
    ];

    this.addEventListener("keydown", (event) => {
        if (keys.includes(event.key)) {
            changeDirection(event.key);
        }
    });
});

/**
 * This function draw a game starting position
 */
function setup() {
    drawBoard();
    drawSnake();
    drawCandy();
    startGame();
}

/**
 * Start the game
 */
function startGame() {
    const countdown = document.getElementById('countdown');
    let index = 2;

    const timer = setInterval(function() {
        countdown.innerHTML = index;
        index--;

        if (index < 0) {
            clearInterval(timer);
            countdown.style.display = 'none';
            gameIntervall = setInterval(drawSnake, 200);
        }
    }, 1000);
}

/**
 * We draw the board
 */
function drawBoard() {
    const canvas = document.getElementById('game');
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        // we draw the grid pattern
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                let x = Math.floor(gridSize * col);
                let y = Math.floor(gridSize * row);
                
                // we check if the square we are drawing is even or odd
                if ((row + col) % 2 === 0) {
                    ctx.fillStyle = `rgb(43, 174, 26)`; // even
                } else {
                    ctx.fillStyle = `rgb(36, 136, 20)`; // odd
                }

                ctx.fillRect(x, y, gridSize, gridSize);
            }
        }
    }
}

/**
 * Draw the snake on the board
 */
function drawSnake() {
    const canvas = document.getElementById('game');
    const gameOverModal = document.querySelector('.game-over');

    let head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'RIGHT':
            head.x = head.x + gridSize;
            break;
        case 'LEFT':
            head.x = head.x - gridSize;
            break;
        case 'UP':
            head.y = head.y - gridSize;
            break;
        case 'DOWN':
            head.y = head.y + gridSize;
            break;
    }

    let collision = checkCollision(head);
    // check if we died
    if (collision == 'BORDER' || collision == 'BODY')
    {
        clearInterval(gameIntervall);
        gameOverModal.style.display = 'flex';
    }
    // check if we got a candy
    else if (collision == 'CANDY')
    {
        relocateCandy();
    };

    snake.unshift(head);
    if (collision !== 'CANDY') {
        snake.pop();
    }
    drawBoard();
    drawCandy();

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        g = 100;
        b = 240;

        snake.forEach(part => {
            ctx.fillStyle = `rgb(0, ${g}, ${b})`;
            ctx.fillRect(part.x, part.y, gridSize, gridSize);
            if (g > 30) {g = g - 5}
            if (b > 100) {b = b - 10}
        });
    }
}

/**
 * Draw the candy on the board
 */
function drawCandy() {
    const canvas = document.getElementById('game');

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

        ctx.fillStyle = `rgb(223, 0, 0)`;
        ctx.fillRect(candy.x, candy.y, gridSize, gridSize);
    }
}

/**
 * Place the candy on a new spot in the canvas
 */
function relocateCandy() {
    let valid = false;
    let x, y;

    while (!valid) {
        x = Math.floor(Math.random() * 15) * gridSize;
        y = Math.floor(Math.random() * 15) * gridSize;
        
        valid = !snake.some(part => part.x === x && part.y === y);
    }

    candy.x = x;
    candy.y = y;
}

/**
 * Change the direction of the snake
 * 
 * @param {string} key
 */
function changeDirection(key) {
    switch (key) {
        case 'ArrowUp':
        case 'W': 
        case 'w':
            if (direction !== 'DOWN') {   
                direction = 'UP';
            }
            break;
        
        case 'ArrowDown':
        case 'S':
        case 's':
            if (direction !== 'UP') {   
                direction = 'DOWN';
            }
            break;
        
        case 'ArrowLeft':
        case 'A':
        case 'a':
            if (direction !== 'RIGHT') {   
                direction = 'LEFT';
            }
            break;

        case 'ArrowRight':
        case 'D': 
        case 'd':
            if (direction !== 'LEFT') {   
                direction = 'RIGHT';
            }
            break;

        default:
            if (direction !== 'LEFT') {   
                direction = 'RIGHT';
            } else {
                direction = 'UP';
            }
            break;
    }
}

/**
 * Check if a collision is happening
 * 
 * @param {object} head
 */
function checkCollision(head) {
    // check if we are going to collide with the border
    if (head.x < 0 || head.x >= 600 || head.y < 0 || head.y >= 600) {
        return 'BORDER';
    }

    // check if we are going to collide with our own body
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return 'BODY';
        }
    }

    // check if we are going to collide with a candy
    if (head.x == candy.x && head.y == candy.y) {
        return 'CANDY';
    }

    return false;
}