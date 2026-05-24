const canvas = document.getElementById('arkan');
const ctx = canvas.getContext('2d');

const ball_radius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let dX = 3;
let dY = -3;


const brick_line_count = 6;
const brick_column_count = 5;
const brick_width = 150;
const brick_height = 50;
const brick_offsetX = 51;
const brick_offsetY = 65;
const brick_padding = 15;

const bricks = [];
for (let c = 0; c < brick_column_count; c++) {
    bricks[c] = [];
    for (let l = 0; l < brick_line_count; l++) {
        bricks[c][l] = {
            x: 0,
            y: 0,
            status: 1,
        };
    }
}

function drawBricks() {
    for (let c = 0; c < brick_column_count; c++) {
        for (let l = 0; l < brick_line_count; l++) {
            if (bricks[c][l].status === 1) {


                const brickX = l * (brick_width + brick_padding) + brick_offsetX;

                const brickY = c * (brick_height + brick_padding) + brick_offsetY;

                bricks[c][l].x = brickX;
                bricks[c][l].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brick_width, brick_height);

                ctx.fillStyle = '#efc5fa';
                ctx.fill();

                ctx.closePath();
            }
        }
    }

}

function ballCollision() {
    for (let c = 0; c < brick_column_count; c++) {
        for (let l = 0; l < brick_line_count; l++) {
            let brick = bricks[c][l];

            if (brick.status === 1) {

                const isCollisionTrue =
                    ballX > brick.x && ballX < brick.x + brick_width &&
                    ballY > brick.y && ballY < brick.y + brick_height;

                if (isCollisionTrue) {
                    dY = -dY;
                    brick.status = 0;


                }
            }


        }
    }

}

const paddle = {
    x: 490,
    y: 690,
    width: 100,
    height: 10
};

let rightPressed = false;
let leftPressed = false;

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

    if (leftPressed && paddle.x > 0) {
        paddle.x -= 12;
    }
    if (rightPressed && paddle.x + paddle.width < canvas.width) {
        paddle.x += 12;
    }


    ballX += dX;
    ballY += dY;

    requestAnimationFrame(draw);
}

draw();