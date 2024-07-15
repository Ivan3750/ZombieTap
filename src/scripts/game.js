// Canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Ground position
const groundY = (canvasHeight / 2) + 150;

// Dino
let dinoX = 50;
let dinoY = groundY - 450; // Adjusted for dino height
let dinoWidth = 300;
let dinoHeight = 300;
let dinoSpeedY = 0;
let gravity = 0.6;
let jumpPower = -15;
let isJumping = false;

// Obstacles
let obstacles = [];
let obstacleWidth = 20;
let obstacleHeight = 20;
let obstacleSpeed = 3;

// Score
let score = 0;

// Load dino running images
const dinoRunImages = [];
for (let i = 1; i <= 8; i++) {
    const img = new Image();
    img.src = `../assets/sprites/1/Run (${i}).png`; // Adjust to the actual path of the images
    dinoRunImages.push(img);
}

// Load dino jumping images
const dinoJumpImages = [];
for (let i = 1; i <= 15; i++) {
    const img = new Image();
    img.src = `../assets/sprites/1/Jump (${i}).png`; // Adjust to the actual path of the images
    dinoJumpImages.push(img);
}

// Load background image
const backgroundImage = new Image();
backgroundImage.src = '../assets/img/BackgroundGameOut.png'; // Adjust to the actual path of the background image

// Load ground image
const groundImage = new Image();
groundImage.src = '../assets/img/land.png'; // Adjust to the actual path of the ground image

// Function to ensure all images are loaded
function loadImages(images, callback) {
    let loadedCount = 0;
    images.forEach((image) => {
        image.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                callback();
            }
        };
    });
}

// Dino animation parameters
let currentFrame = 0;
const frameSpeed = 5; // Adjust speed of animation (lower value for faster animation)
let frameCount = 0;

// Ground animation parameters
let groundX = 0;
const groundSpeed = 2; // Adjust the speed of the ground scroll

// Function to draw background image
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
}

// Function to draw ground image
function drawGround() {
    const groundWidth = groundImage.width;
    const groundHeight = groundImage.height;

    // Adjust groundX to create scrolling effect
    groundX -= groundSpeed;
    if (groundX <= -groundWidth) {
        groundX = 0;
    }

    // Draw two ground images side by side for seamless scrolling
    ctx.drawImage(groundImage, groundX, groundY - groundHeight, groundWidth, groundHeight);
    ctx.drawImage(groundImage, groundX + groundWidth, groundY - groundHeight, groundWidth, groundHeight);
}

// Function to draw dino
function drawDino() {
    frameCount++;
    if (frameCount >= frameSpeed) {
        frameCount = 0;
        currentFrame = (currentFrame + 1) % (isJumping ? dinoJumpImages.length : dinoRunImages.length);
    }

    const currentImages = isJumping ? dinoJumpImages : dinoRunImages;
    ctx.drawImage(currentImages[currentFrame], dinoX, dinoY, dinoWidth, dinoHeight);
}

// Function to draw obstacles
function drawObstacles() {
    obstacles.forEach((obstacle) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, groundY - obstacleHeight -170, obstacleWidth, obstacleHeight);
    });
}

// Function to update game
function update() {
    // Update dino
    if (isJumping) {
        dinoSpeedY += gravity;
        dinoY += dinoSpeedY;
        if (dinoY >= groundY - dinoHeight -150) {
            dinoY = groundY - dinoHeight -150;
            isJumping = false;
        }
    }

    // Update obstacles
    obstacles.forEach((obstacle) => {
        obstacle.x -= obstacleSpeed;
    });

    // Check collision with obstacles
    obstacles.forEach((obstacle) => {
        if (checkCollision(dinoX, dinoY, obstacle.x, groundY - obstacleHeight)) {
            resetGame();
        }
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacleWidth > 0);

    // Update score
    score++;
}

// Function to draw everything
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground(); // Draw background image
    drawGround(); // Draw ground image
    drawDino();
    drawObstacles();
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

// Function to check collision
function checkCollision(x1, y1, x2, y2) {
    if (x1 + dinoWidth > x2 && x1 < x2 + obstacleWidth && y1 + dinoHeight > y2 && y1 < y2 + obstacleHeight) {
        return true;
    }
    return false;
}

// Function to reset the game
function resetGame() {
    dinoX = 50;
    dinoY = groundY - dinoHeight;
    dinoSpeedY = 0;
    obstacles = [];
    score = 0;
}

// Main game loop
function gameLoop() {
    update();
    draw();
}

// Add event listener for key press


window.addEventListener("click", ()=>{
    if(!isJumping){
        dinoSpeedY = jumpPower;
            isJumping = true;
    }
})

document.addEventListener('keydown', (event) => {
    if ((event.key === 'ArrowUp' || event.key === ' ') && !isJumping) {
        dinoSpeedY = jumpPower;
        isJumping = true;
    }
});

// Generate obstacles at intervals
setInterval(() => {
    obstacles.push({
        x: canvasWidth,
        y: groundY - obstacleHeight,
    });
}, 2000);

// Start game loop after images are loaded
loadImages([...dinoRunImages, ...dinoJumpImages, backgroundImage, groundImage], () => {
    setInterval(gameLoop, 1000 / 60);
});
