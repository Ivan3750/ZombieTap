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
let obstacleWidth = 150; // Adjust based on obstacle image dimensions
let obstacleHeight = 154.9; // Adjust based on obstacle image dimensions
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
backgroundImage.src = '../assets/img/BackgroundGameOut.png'; // Adjust to the actual path of the background image

// Load ground image
const groundImage = new Image();
groundImage.src = '../assets/img/land.png'; // Adjust to the actual path of the ground image

// Load obstacle images
const obstacleImages = [];
const obstacleImg = new Image();
obstacleImg.src = `../assets/sprites/obstacle.png`; // Adjust to the actual path of the obstacle image
obstacleImages.push(obstacleImg);

// Load play button image
const playButtonImage = new Image();
playButtonImage.src = `../assets/sprites/playButton.png`; // Adjust to the actual path of the play button image

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
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
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
function drawzombie() {
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
        const obstacleImg = obstacleImages[0]; // Use the single obstacle image
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
    drawzombie();
    drawObstacles();
// Створіть об'єкти Image
const scoreImg = new Image();
const tokensImg = new Image();

// Встановіть джерела для зображень
scoreImg.src = '../assets/icons/rocket.png'; // Змініть шлях до вашого зображення
tokensImg.src = '../assets/icons/coin.png'; // Змініть шлях до вашого зображення

// Намалюйте все після завантаження зображень
scoreImg.onload = () => {
    tokensImg.onload = () => {
        // Налаштування шрифтів та кольорів
        ctx.font = '80px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center'; 
        ctx.textBaseline = 'middle'; // Вирівнювання тексту по центру зображення

        // Визначте центр
        const centerX = canvas.width / 2;

        // Малюйте зображення
        const imageY = 20; // Вершина першого зображення
        const imageHeight = 80; // Висота зображення

        // Налаштування тіні для тексту
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;

    

        // Малюйте зображення для score
        ctx.drawImage(scoreImg, centerX - 140, imageY, 80, 80); // Зображення буде розміщене ліворуч від тексту
        ctx.fillText(`${Math.floor(score)}`, centerX, imageY + imageHeight / 2); // Текст буде поруч з зображенням

        // Малюйте зображення для tokens
        const tokensY = 120; // Вершина другого зображення
        ctx.drawImage(tokensImg, centerX - 140, tokensY, 80, 80); // Зображення буде розміщене ліворуч від тексту
        ctx.fillText(`${tokens}`, centerX, tokensY + imageHeight / 2); // Текст буде поруч з зображенням

        // Прибрати тіні після малювання
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
            imgIndex: 0 // Use the single obstacle image
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

// Add event listener for play button
canvas.addEventListener('click', (event) => {
    if (gameIdle) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if play button is clicked
        if (x >= canvasWidth / 2 - 100 && x <= canvasWidth / 2 + 100 &&
            y >= canvasHeight / 2 - 50 && y <= canvasHeight / 2 + 50) {
            startGame();
        }
    }
});

// Start idle animation loop
loadImages([...zombieRunImages, ...zombieJumpImages, ...zombieIdleImages, ...zombieAttackImages, backgroundImage, groundImage, obstacleImages[0], playButtonImage], () => {
    setInterval(() => {
        if (gameIdle) {
            drawIdleScreen();
        }
    }, 1000 / 60);
});

startGame();
