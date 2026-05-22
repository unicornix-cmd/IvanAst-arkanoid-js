const canvas = document.getElementById('arkan');
const ctx = canvas.getContext('2d');

const ball_radius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let dX = 3;
let dY = -3;

const paddle = {
    x: 490,
    y: 690,
    width: 100,
    height: 10
};

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

    ballX += dX;
    ballY += dY;

    requestAnimationFrame(draw);
}

draw();