const canvas = document.getElementById('arkan');
const ctx = canvas.getContext('2d');

let gameStarted = false;

let rightPressed = false;
let leftPressed = false;

const ball_radius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let dX = 3;
let dY = -3;

ctx.font = '25px Audiowide';

let lives = 3;
let score = 0;

const paddle = {
    x: canvas.width / 2 - 75,
    y: 690,
    width: 150,
    height: 10
};

const brickConfig = {
    line_count: 6,
    column_count: 5,
    width: 150,
    height: 50,
    offsetX: 51,
    offsetY: 65,
    padding: 15
}


const bricks = [];
for (let c = 0; c < brickConfig.column_count; c++) {
    bricks[c] = [];
    for (let l = 0; l < brickConfig.line_count; l++) {
        bricks[c][l] = {
            x: 0,
            y: 0,
            status: 1,
        };
    }
}

function drawScore() {
    ctx.fillText("SCORE: " + score, 51, 30);
}

function drawLives() {
    ctx.fillText("LIVES: " + (lives - 1), canvas.width - 170, 30);
}

function drawBricks() {
    for (let c = 0; c < brickConfig.column_count; c++) {
        for (let l = 0; l < brickConfig.line_count; l++) {
            if (bricks[c][l].status === 1) {


                const brickX = l * (brickConfig.width + brickConfig.padding) + brickConfig.offsetX;

                const brickY = c * (brickConfig.height + brickConfig.padding) + brickConfig.offsetY;

                bricks[c][l].x = brickX;
                bricks[c][l].y = brickY;

                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickConfig.width, brickConfig.height, 3);

                ctx.fillStyle = '#efc5fa';
                ctx.fill();

                ctx.closePath();
            }
        }
    }

}

function ballCollision() {
    for (let c = 0; c < brickConfig.column_count; c++) {
        for (let l = 0; l < brickConfig.line_count; l++) {
            let brick = bricks[c][l];

            if (brick.status === 1) {

                const isCollisionTrue =
                    ballX > brick.x && ballX < brick.x + brickConfig.width + ball_radius &&
                    ballY > brick.y && ballY < brick.y + brickConfig.height + ball_radius;

                if (isCollisionTrue) {
                    dY = -dY;
                    brick.status = 0;

                    score += 100;
                    dX += 0.65;
                    dY += 0.65;

                }

                if ((score / 100) === brickConfig.column_count * brickConfig.line_count) {
                    alert('Победа!');
                    score = 0;
                    document.location.reload();
                }
            }


        }
    }

}



document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {

    if (event.key === 'ArrowRight') {
        rightPressed = true;
    }

    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(event) {

    if (event.key === 'ArrowRight') {
        rightPressed = false;
    }

    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}


function drawPaddle() {
    ctx.beginPath();

    ctx.roundRect(
        paddle.x,
        paddle.y,
        paddle.width,
        paddle.height,
        10
    );

    ctx.fillStyle = '#efc5fa';
    ctx.fill();

    ctx.closePath();
}

function drawBall() {

    ctx.beginPath();

    ctx.arc(
        ballX,
        ballY,
        ball_radius,
        0,
        Math.PI * 2

    );

    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.closePath();

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
    drawBricks();
    ballCollision();
    drawScore();
    drawLives();

    if (leftPressed && paddle.x > 0) {
        paddle.x -= 12;
    }
    if (rightPressed && paddle.x + paddle.width < canvas.width) {
        paddle.x += 12;
    }

    if (ballX > canvas.width) {
        dX = -dX;
    }
    if (ballX + dX < ball_radius || ballX + dX > canvas.width - ball_radius) {
        dX = -dX;
    }
    if (ballY + dY < 65 - ball_radius) {
        dY = -dY;
    }
    if (ballY + dY > 690 - ball_radius) {
        if (ballX > paddle.x - ball_radius && ballX < paddle.x + paddle.width - ball_radius) {
            dY = -dY;
        } else {
            lives--;

            if (lives === 0) {
                alert('Вы проиграли! \nИгра окончена');

                document.location.reload();
            } else {
                ballX = canvas.width / 2;
                ballY = canvas.height - 40;
                paddle.x = canvas.width / 2 - 75;
                dX = 3;
                dY = -3;
            }
        }

    }


    ballX += dX;
    ballY += dY;

    requestAnimationFrame(draw);
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!gameStarted) {
        gameStarted = true;
        startBtn.style.display = 'none';
        draw();
    }
});