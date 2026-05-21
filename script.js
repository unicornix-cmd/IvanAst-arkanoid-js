const canvas = document.getElementById('arkan');
const ctx = canvas.getContext('2d');


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
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();

    requestAnimationFrame(draw);
}

draw();