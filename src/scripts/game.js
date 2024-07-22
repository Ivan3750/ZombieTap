// Canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Ground position
const groundY = (canvasHeight / 2) + 150;

// zombie
let zombieX = 50;
let zombieY = groundY - 450; // Adjusted for zombie height
let zombieWidth = 200;
let zombieHeight = 327.05;
let zombieSpeedY = 0;
let gravity = 0.4; // Reduced gravity
let jumpPower = -20; // Increased jump power
let isJumping = false;
let isAttacking = false;

// Obstacles
let obstacles = [];
const obstacleImages = [];
const numObstacleImages = 10; // Number of different obstacle images
const obstacleWidth = 204; // Adjust based on obstacle image dimensions
const obstacleHeight = 208.5; // Adjust based on obstacle image dimensions
let initialObstacleSpeed = 6;
let obstacleSpeed = initialObstacleSpeed; // Initialize with initialObstacleSpeed

// Score and tokens
let score = 0;
let tokens = 0;
let multiplier = 1; // Multiplier for boosts

// Load zombie running images
const zombieRunImages = [];
for (let i = 1; i <= 8; i++) {
    const img = new Image();
    img.src = `../assets/sprites/1/Run (${i}).png`; // Adjust to the actual path of the images
    zombieRunImages.push(img);
}

// Load zombie jumping images
const zombieJumpImages = [];
for (let i = 1; i <= 15; i++) {
    const img = new Image();
    img.src = `../assets/sprites/1/Jump (${i}).png`; // Adjust to the actual path of the images
    zombieJumpImages.push(img);
}

// Load zombie idle images
const zombieIdleImages = [];
for (let i = 1; i <= 10; i++) { // Assuming there are 10 idle images
    const img = new Image();
    img.src = `../assets/sprites/1/Idle 1 (${i}).png`; // Adjust to the actual path of the images
    zombieIdleImages.push(img);
}

// Load zombie attack images
const zombieAttackImages = [];
for (let i = 1; i <= 8; i++) { // Assuming there are 8 attack images
    const img = new Image();
    img.src = `../assets/sprites/1/Attack (${i}).png`; // Adjust to the actual path of the images
    zombieAttackImages.push(img);
}

// Load background image
const backgroundImage = new Image();
backgroundImage.src = '../assets/img/BackgroundGameOut-1.jpg'; // Adjust to the actual path of the background image

// Load ground image
const groundImage = new Image();
groundImage.src = '../assets/img/Background-1.jpg'; // Adjust to the actual path of the ground image

// Load obstacle images
for (let i = 0; i < numObstacleImages; i++) {
    const img = new Image();
    img.src = `../assets/sprites/obs/${i}.png`; // Adjust to the actual path of the obstacle image
    obstacleImages.push(img);
}

// Load play button image
const playButtonImage = new Image();
playButtonImage.src = `../assets/img/BackgroundGame0.jpeg`; // Adjust to the actual path of the play button image

// Game state
let gameStarted = false;
let gameIdle = true; // Start with idle state

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

// zombie animation parameters
let currentFrame = 0;
const frameSpeed = 5; // Adjust speed of animation (lower value for faster animation)
let frameCount = 0;

// Ground animation parameters
let groundX = 0;
const groundSpeed = 4; // Increased speed of the ground scroll

// Function to draw background
function drawBackground() {
    const bgWidth = backgroundImage.width;
    const bgHeight = backgroundImage.height;

    // Calculate the source and destination dimensions to crop the background image
    const srcX = 0;
    const srcY = 0;
    const srcWidth = Math.min(bgWidth, canvasWidth);
    const srcHeight = Math.min(bgHeight, canvasHeight);

    ctx.drawImage(backgroundImage, srcX, srcY, srcWidth, srcHeight, 0, 0, canvasWidth, canvasHeight);
}

// Function to draw ground
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

// Function to draw zombie
function drawZombie() {
    frameCount++;
    if (frameCount >= frameSpeed) {
        frameCount = 0;
        currentFrame = (currentFrame + 1) % (isJumping ? zombieJumpImages.length : isAttacking ? zombieAttackImages.length : zombieRunImages.length);
    }

    const currentImages = isJumping ? zombieJumpImages : isAttacking ? zombieAttackImages : zombieRunImages;
    ctx.drawImage(currentImages[currentFrame], zombieX, zombieY, zombieWidth, zombieHeight);
}

// Function to draw obstacles
function drawObstacles() {
    obstacles.forEach((obstacle) => {
        const obstacleImg = obstacleImages[obstacle.imgIndex]; // Use the obstacle's assigned image
        ctx.drawImage(obstacleImg, obstacle.x, groundY - obstacleHeight - 170, obstacleWidth, obstacleHeight);
    });
}

// Function to update game
function update() {
    // Update zombie
    if (isJumping) {
        zombieSpeedY += gravity;
        zombieY += zombieSpeedY;
        if (zombieY >= groundY - zombieHeight - 150) {
            zombieY = groundY - zombieHeight - 150;
            isJumping = false;
        }
    }

    // Update obstacles
    obstacles.forEach((obstacle) => {
        obstacle.x -= obstacleSpeed;
    });

    // Check collision with obstacles
    obstacles.forEach((obstacle) => {
        if (checkCollision(zombieX, zombieY, obstacle.x, groundY - obstacleHeight - 170)) {
            resetGame();
        }
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacleWidth > 0);

    // Update score and speed
    score += multiplier * 0.1; // Increase score based on multiplier

    // Increase obstacle speed every 100 points
    if (Math.floor(score) % 100 === 0) {
        obstacleSpeed += 0.1; 
    }
}

// Function to draw everything
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground(); // Draw background image
    drawGround(); // Draw ground image
    drawZombie();
    drawObstacles();
    // Create Image objects
    const scoreImg = new Image();
    const tokensImg = new Image();

    // Set sources for the images
    scoreImg.src = '../assets/icons/rocket.png'; // Adjust path to your image
    tokensImg.src = '../assets/icons/coin.png'; // Adjust path to your image

    // Draw everything after images are loaded
    scoreImg.onload = () => {
        tokensImg.onload = () => {
            // Font and color settings
            ctx.font = '80px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle'; // Align text in the center of the image

            // Define center
            const centerX = canvas.width / 2;

            // Draw images
            const imageY = 20; // Top of the first image
            const imageHeight = 80; // Image height

            // Shadow settings for text
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 5;

            // Draw image for score
            ctx.drawImage(scoreImg, centerX - 140, imageY, 80, 80); // Image placed to the left of the text
            ctx.fillText(`${Math.floor(score)}`, centerX, imageY + imageHeight / 2); // Text placed next to the image

            // Draw image for tokens
            const tokensY = 120; // Top of the second image
            ctx.drawImage(tokensImg, centerX - 140, tokensY, 80, 80); // Image placed to the left of the text
            ctx.fillText(`${tokens}`, centerX, tokensY + imageHeight / 2); // Text placed next to the image

            // Remove shadows after drawing
            ctx.shadowColor = 'transparent';
        };
    };
}

// Function to check collision
function checkCollision(zombieX, zombieY, obstacleX, obstacleY) {
    return (
        zombieX < obstacleX + obstacleWidth &&
        zombieX + zombieWidth > obstacleX &&
        zombieY < obstacleY + obstacleHeight &&
        zombieY + zombieHeight > obstacleY
    );
}

// Function to reset the game
function resetGame() {
    zombieX = 50;
    zombieY = groundY - zombieHeight - 170;
    zombieSpeedY = 0;
    obstacles = [];
    score = 0;
    tokens = 0; // Reset tokens
    obstacleSpeed = initialObstacleSpeed; // Reset speed
}

// Main game loop
function gameLoop() {
    update();
    draw();
}

// Add event listener for key press
window.addEventListener("click", () => {
    if (!isJumping) {
        zombieSpeedY = jumpPower;
        isJumping = true;
        tokens += 1 + Math.floor(score / 400); // Increase tokens based on score
    }
    isAttacking = true; // Set attacking state
    setTimeout(() => {
        isAttacking = false; // Reset attacking state after a short duration
    }, 500); // Attack duration
});

document.addEventListener('keydown', (event) => {
    if ((event.key === 'ArrowUp' || event.key === ' ') && !isJumping) {
        zombieSpeedY = jumpPower;
        isJumping = true;
        tokens += 1 + Math.floor(score / 400); // Increase tokens based on score
    }
    if (event.key === 'a') { // Assuming 'a' is for attack
        isAttacking = true; // Set attacking state
        setTimeout(() => {
            isAttacking = false; // Reset attacking state after a short duration
        }, 500); // Attack duration
    }
});

// Generate obstacles at intervals
setInterval(() => {
    if (gameStarted) {
        obstacles.push({
            x: canvasWidth,
            y: groundY - obstacleHeight,
            imgIndex: Math.floor(Math.random() * numObstacleImages) // Assign a random image index
        });
    }
}, 3000); // Interval remains the same at 3000ms (3 seconds)

// Function to draw idle screen
function drawIdleScreen() {
    frameCount++;
    if (frameCount >= frameSpeed) {
        frameCount = 0;
        currentFrame = (currentFrame + 1) % zombieIdleImages.length;
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    ctx.drawImage(zombieIdleImages[currentFrame], zombieX, zombieY, zombieWidth, zombieHeight);
    ctx.drawImage(playButtonImage, canvasWidth / 2 - 100, canvasHeight / 2 - 50, 200, 100); // Adjust button size and position
}

// Function to start the game
function startGame() {
    gameStarted = true;
    gameIdle = false;
    setInterval(gameLoop, 1000 / 60);
}

canvas.addEventListener('click', (event) => {
    if (gameIdle) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= canvasWidth / 2 - 100 && x <= canvasWidth / 2 + 100 &&
            y >= canvasHeight / 2 - 50 && y <= canvasHeight / 2 + 50) {
            startGame();
        }
    }
});

loadImages([...zombieRunImages, ...zombieJumpImages, ...zombieIdleImages, ...zombieAttackImages, backgroundImage, groundImage, ...obstacleImages, playButtonImage], () => {
    setInterval(() => {
        if (gameIdle) {
            drawIdleScreen();
        }
    }, 1000 / 60);
});
startGame();
