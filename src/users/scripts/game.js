const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const groundY = (canvasHeight / 2) + 150;

let zombieIndex = 1;
let zombieX = 50;
let zombieY = groundY - 450;
let zombieWidth = 200;
let zombieHeight = 327;
let zombieSpeedY = 1;
let gravity = 0.35;
let jumpPower = -15.5;
let isJumping = false;
let isAttacking = false;
let cropIndex = 100;
let zombieSpeed = 7;

let obstacles = [];
let ghostObstacles = [];
const obstacleImages = [];
const numObstacleImages = 7;
const obstacleWidth = 120;
const obstacleHeight = 140;
const ghostWidth = 150;
const ghostHeight = 200;
let initialObstacleSpeed = 8;
let obstacleSpeed = initialObstacleSpeed;

let score = 0;
let tokens = 0;
let multiplier = 1;

const zombieRunImages = [];
const zombieJumpImages = [];
const zombieIdleImages = [];
const zombieAttackImages = [];

for (let i = 1; i <= 8; i++) {
    const img = new Image();
    img.src = `../../assets/sprites/${zombieIndex}/Run (${i}).png`;
    zombieRunImages.push(img);
}

for (let i = 1; i <= 15; i++) {
    const img = new Image();
    img.src = `../../assets/sprites/${zombieIndex}/Jump (${i}).png`;
    zombieJumpImages.push(img);
}

for (let i = 1; i <= 10; i++) {
    const img = new Image();
    img.src = `../../assets/sprites/${zombieIndex}/Idle ${zombieIndex} (${i}).png`;
    zombieIdleImages.push(img);
}

for (let i = 1; i <= 8; i++) {
    const img = new Image();
    img.src = `../../assets/sprites/${zombieIndex}/Attack (${i}).png`;
    zombieAttackImages.push(img);
}

const backgroundImage = new Image();
backgroundImage.src = '../../assets/img/BackgroundGameOut-1.jpg';

const groundImage = new Image();
groundImage.src = '../../assets/img/Background-1.jpg';

for (let i = 1; i < numObstacleImages; i++) {
    const img = new Image();
    img.src = `../../assets/sprites/obs/${i}.png`;
    obstacleImages.push(img);
}

const ghostImage = new Image();
let ghostImageLoaded = false;
ghostImage.src = '../../assets/sprites/ghost/0.png';
ghostImage.onload = () => {
    ghostImageLoaded = true;
};

function loadImages(images, callback) {
    let loadedCount = 0;
    images.forEach((image) => {
        image.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                callback();
            }
        };
        image.onerror = () => {
            console.error('Failed to load image:', image.src);
        };
    });
}

let currentFrame = 0;
const frameSpeed = 5;
let frameCount = 0;

let groundX = 0;
const groundSpeed = 4;

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
}

function drawGround() {
    const groundWidth = groundImage.width;
    const groundHeight = groundImage.height;

    groundX -= groundSpeed;
    if (groundX <= -groundWidth) {
        groundX = 0;
    }

    ctx.drawImage(groundImage, groundX, groundY - groundHeight, groundWidth, groundHeight);
    ctx.drawImage(groundImage, groundX + groundWidth, groundY - groundHeight, groundWidth, groundHeight);
}

function drawZombie() {
    frameCount++;
    if (frameCount >= frameSpeed) {
        frameCount = 0;
        const currentImages = isJumping ? zombieJumpImages : isAttacking ? zombieAttackImages : zombieRunImages;
        currentFrame = (currentFrame + 1) % currentImages.length;
    }

    const currentImages = isJumping ? zombieJumpImages : isAttacking ? zombieAttackImages : zombieRunImages;
    const currentImage = currentImages[currentFrame];

    const originalWidth = currentImage.width;
    const cropWidth = originalWidth - cropIndex;
    const cropHeight = currentImage.height;
    const cropX = 0;

    ctx.drawImage(
        currentImage,
        cropX,
        0,
        cropWidth,
        cropHeight,
        zombieX,
        zombieY,
        zombieWidth,
        zombieHeight
    );
}

function drawObstacles() {
    obstacles.forEach((obstacle) => {
        const obstacleImg = obstacleImages[obstacle.imgIndex];
        ctx.drawImage(obstacleImg, obstacle.x, groundY - obstacleHeight - 170, obstacleWidth, obstacleHeight);
    });

    ghostObstacles.forEach((ghost) => {
        if (ghostImageLoaded) {
            ctx.drawImage(ghostImage, ghost.x, ghost.y, ghostWidth, ghostHeight);
        }
    });
}

function update() {
    if (gameOver) return;

    if (isJumping) {
        zombieSpeedY += gravity;
        zombieY += zombieSpeedY;
        if (zombieY >= groundY - zombieHeight - 150) {
            zombieY = groundY - zombieHeight - 150;
            isJumping = false;
        }
    }

    obstacles.forEach((obstacle) => {
        obstacle.x -= obstacleSpeed;
    });

    ghostObstacles.forEach((ghost) => {
        ghost.x -= obstacleSpeed;
    });

    obstacles.forEach((obstacle) => {
        if (checkCollision(zombieX, zombieY, obstacle.x, groundY - obstacleHeight - 170, obstacleWidth, obstacleHeight)) {
            gameOver = true;
        }
    });

    ghostObstacles.forEach((ghost) => {
        if (checkCollision(zombieX, zombieY, ghost.x, ghost.y, ghostWidth, ghostHeight)) {
            gameOver = true;
        }
    });

    obstacles = obstacles.filter(obstacle => obstacle.x + obstacleWidth > 0);
    ghostObstacles = ghostObstacles.filter(ghost => ghost.x + ghostWidth > 0);

    score += multiplier * 0.1;

    if (Math.floor(score) % 100 === 0) {
        obstacleSpeed += 0.1;
    }

    if (score > 1000 && Math.floor(score) % 500 === 0) {
        spawnGhost();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    drawGround();

    if (gameOver) {
        ctx.font = '80px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2 - 50);
        ctx.font = '80px Arial';
        ctx.fillText(`Score: ${Math.floor(score)}`, canvasWidth / 2, canvasHeight / 2 + 50);
        setTimeout(() => {
            window.location.href = "../pages/index.html"
        }, 500)
        return;
    }

    drawZombie();
    drawObstacles();

    const scoreImg = new Image();
    const tokensImg = new Image();

    scoreImg.src = '../../assets/icons/rocket.png';
    tokensImg.src = '../../assets/icons/coin.png';

    scoreImg.onload = () => {
        tokensImg.onload = () => {
            ctx.font = '80px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const centerX = canvas.width / 2;
            const imageY = 20;
            const imageHeight = 80;

            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;

            const spacing = 150;

            ctx.drawImage(scoreImg, centerX - 190, imageY, imageHeight, imageHeight);
            ctx.fillText(`${Math.floor(score)}`, centerX - 190 + imageHeight + spacing / 2, imageY + imageHeight / 2);

            ctx.drawImage(tokensImg, centerX - 190 + imageHeight + spacing, imageY, imageHeight, imageHeight);
            ctx.fillText(`${tokens}`, centerX - 190 + imageHeight + spacing + imageHeight + spacing / 2, imageY + imageHeight / 2);

            ctx.shadowColor = 'transparent';
        };
    };
}

function checkCollision(zombieX, zombieY, obstacleX, obstacleY, obstacleWidth, obstacleHeight) {
    return (
        zombieX < obstacleX + obstacleWidth &&
        zombieX + zombieWidth > obstacleX &&
        zombieY < obstacleY + obstacleHeight &&
        zombieY + zombieHeight > obstacleY
    );
}

function resetGame() {
    zombieX = 50;
    zombieY = groundY - zombieHeight - 150;
    zombieSpeedY = 0;
    obstacles = [];
    ghostObstacles = [];
    score = 0;
    tokens = 0;
    obstacleSpeed = initialObstacleSpeed;
    gameOver = false;
}

function gameLoop() {
    if (!gameOver) {
        update();
    }
    draw();
}

window.addEventListener("click", () => {
    if (gameOver) {
        resetGame();
    } else if (!isJumping) {
        zombieSpeedY = jumpPower;
        isJumping = true;
        tokens += 1 + Math.floor(score / 400);
    }
    isAttacking = true;
    setTimeout(() => {
        isAttacking = false;
    }, 500);
});

document.addEventListener('keydown', (event) => {
    if ((event.key === 'ArrowUp' || event.key === ' ') && !isJumping) {
        zombieSpeedY = jumpPower;
        isJumping = true;
        tokens += 1 + Math.floor(score / 400);
    }
    if (event.key === 'a') {
        isAttacking = true;
        setTimeout(() => {
            isAttacking = false;
        }, 500);
    }
});

setInterval(() => {
    if (!gameOver) {
        obstacles.push({
            x: canvasWidth,
            y: groundY - obstacleHeight,
            imgIndex: Math.floor(Math.random() * numObstacleImages)
        });
    }
}, 3000);

function spawnGhost() {
    if (!gameOver) {
        ghostObstacles.push({
            x: canvasWidth,
            y: Math.random() * (canvasHeight - ghostHeight)
        });
    }
}

function startGame() {
    gameStarted = true;
    setInterval(gameLoop, 1000 / 60);
}

loadImages([...zombieRunImages, ...zombieJumpImages, ...zombieIdleImages, ...zombieAttackImages, backgroundImage, groundImage, ...obstacleImages, ghostImage], () => {
    resetGame();
    startGame();
});
