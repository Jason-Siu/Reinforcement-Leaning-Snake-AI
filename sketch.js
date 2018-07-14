var snake;
var food;

var gameboard = [];
var locNOSNAKE;
function setup()
{
    for (let i = 0; i < 30; i++) 
    {
        var temp = [];
        for (let j = 0; j < 30; j++) 
        {
            temp.push(true);
        }
        gameboard.push(temp);
    }
    
    locNOSNAKE = gameboard.slice();
    
    createCanvas(600,600);
    snake = new Snake();
    snake.pickLocSnake();
    food = new Food();
    neural = new Neural();
    food.pickLoc();
    prevDistTofood = dist(snake.x, snake.y, food.position()[0], food.position()[1]);
    neural.onCreate();
    frameRate(100);

    
}

function draw()
{
    background(51);
    
    snake.update();
    
    snake.show();
    food.show();
    if(snake.eat(food.position()[0], food.position()[1]))
    {
        food.pickLoc();
        neural.canEat = true;
    }
    neural.feedForward();
    
}

function keyPressed()
{
    if(snake.yspd !== 0)
    {
        if(keyCode === LEFT_ARROW)
        {
            snake.dir(-1, 0);
        }
        else if(keyCode === RIGHT_ARROW)
        {
            snake.dir(1, 0);
        }
    }
    else 
    {
        if(keyCode === UP_ARROW)
        {
            snake.dir(0, -1);
        }
        else if(keyCode === DOWN_ARROW)
        {
            snake.dir(0, 1);
        }
    }
}

