const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
function drawBg() {
    // 定义canvas画布尺寸并绘制
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
let snake = [];
let count = 0; //第几个蛇身子
function drawSnake() {
    // 绘制蛇头，初始位置使用随机数
    // snakeWidth是蛇的长度，先设置吃到东西后只增加宽度
    ctx.fillStyle = '#0f0';
    let snakeWidth = 10;
    let snakeX = Math.random() * (canvas.width - snakeWidth);
    let snakeY = Math.random() * (canvas.height - 10);
    if (count === 0) {
        // console.log("initx:" + snakeX + ",inity:" + snakeY);
        snake.push({ x: snakeX, y: snakeY });
        ctx.fillRect(snakeX, snakeY, 10, 10);
    } else {
        // console.log('len:', snake.length);
        if (['left', 'right'].includes(lastDirection)) {
            ctx.fillRect(snake[0].x, snake[0].y, 10 * (snake.length), 10);
        } else {
            ctx.fillRect(snake[0].x, snake[0].y, 10, 10 * (snake.length));
        }
    }
    count++;
    // console.log("x:" + snake[0].x + ",y:" + snake[0].y);
    // snake.map(item => console.log(item))
    // ctx.fillRect(snakeX, snakeY, 10, 10);
    // snake.map(item=>{
    //     ctx.fillRect(item.x,item.y,10,10)
    // })
}
let food = {};
let isFoodGen = true;//是否重新生成食物
function drawFood() {
    // 绘制食物
    ctx.fillStyle = '#f00';
    if (isFoodGen) {
        let foodX = Math.random() * (canvas.width - 10);
        let foodY = Math.random() * (canvas.height - 10);
        food.x = foodX;
        food.y = foodY;
        isFoodGen = false;
    }
    console.log("foodX:" + food.x + ",foodY:" + food.y);
    ctx.fillRect(food.x, food.y, 10, 10);
}

let direction = ''; // 记录移动方向
let lastDirection = ''; // 记录最后一次移动方向
// 按键事件监听，判断移动方向
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            direction = 'up';
            lastDirection = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            lastDirection = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            lastDirection = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            lastDirection = 'right';
            break;
    }
    console.log(direction)
})

// 横竖反转
function transSnake() {
    snake.map(item=>{
        let tmp = item.x;
        item.x = item.y;
        item.y = tmp;
    })
}


function move() {
    if (direction) {
        if (direction === 'left') {
            // snake[0].x -= 10;
            snake.map(item => {
                item.x -= 10;
            });
        }
        if (direction === 'right') {
            // snake[0].x += 10
            snake.map(item => {
                item.x += 10;
            });
        }
        if (direction === 'up') {
            // snake[0].y -= 10
            snake.map(item => {
                item.y -= 10;
            });
        }
        if (direction === 'down') {
            // snake[0].y += 10
            snake.map(item => {
                item.y += 10;
            });
        }
        // if ((Math.abs(snake[0].x - food.x) < 10 && Math.abs(snake[0].y - food.y) < 10)
        //     || (Math.abs(snake[snake.length - 1].x - food.x) < 10 && Math.abs(snake[snake.length - 1].y - food.y) < 10)
        // )
        // if (isEat()) {
        //     snake.push({ x: snake[snake.length - 1].x + 10, y: snake[snake.length - 1].y + 10 });
        //     isFoodGen = true;
        // }
        snake.map(item => {
            console.log('item:',item);
            if (Math.abs(item.x - food.x) < 10 && Math.abs(item.y - food.y) < 10) {
                snake.push({ x: snake[snake.length - 1].x + 10, y: snake[snake.length - 1].y + 10 });
                isFoodGen = true;
            }
        })
        direction = ''
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    drawBg();
    // 绘制蛇身体
    drawSnake();
    // 绘制食物
    drawFood();
    //移动
    move();
    requestAnimationFrame(draw);
}

draw()