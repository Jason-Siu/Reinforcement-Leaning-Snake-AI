var scl = 20;
var tail = [];
var total = 0;
var dead = false;
var seconds = 10;
var distanceToFood;
// max distance is 600 x sqrt 2
// rounds to 848
var prevDistTofood = 850;
var rewardSnakeDist = false;
var penalizeSnakeDist = false;
function Snake()
{
    this.x = 0;
    this.y = 0;
    this.xspd = 1;
    this.yspd = 0;

    this.update = function()
    {
        // console.log(this.x);
        distanceToFood = dist(this.x, this.y, food.position()[0], food.position()[1]);
        // change this
        if(distanceToFood < prevDistTofood)
        {
            rewardSnakeDist = true;
            prevDistTofood = distanceToFood;
        }
        else if(distanceToFood > prevDistTofood)
        {
            penalizeSnakeDist = true;
            prevDistTofood = distanceToFood;
        }
        for(var i = 0; i < tail.length; i++)
        {
            if(this.x === tail[i][0] && this.y === tail[i][1])
            {
                // alert("dead");
                dead = true;
                this.reset();
            }
        }
        if(total === tail.length)
        {
            for (let i = 0; i < tail.length - 1; i++) 
            {
                tail[i] = tail[i + 1];         
            }
        }
        if(total > 0)
        {
            tail[total - 1] = [this.x, this.y];
        }
        // console.log("Total is: " + total);
        this.x = this.x + this.xspd * scl;
        this.y = this.y + this.yspd * scl;

        if(this.x < 0 || this.x >= 600)
        {
            // alert('dead x');
            dead = true;
            this.reset();
        }
        else if(this.y < 0 || this.y >= 600)
        {
            // alert('dead y');
            dead = true;
            this.reset();
        }
    }

    this.show = function()
    {
        fill(255);
        for (let index = 0; index < tail.length; index++) 
        {
            rect(tail[index][0], tail[index][1], scl, scl);
        }
        rect(this.x, this.y, scl,scl);
    }

    this.dir = function(x, y)
    {
        this.xspd = x;
        this.yspd = y;
    }

    this.eat = function(xp, yp)
    {
        var dis = dist(this.x, this.y, xp, yp);
        eat = true;
        if(dis < 1)
        {
            total++;
            return true;
        }
        return false;
    }

    this.reset = function()
    {
        
        seconds = 11;
        console.log("reset");
        tail = [];
        total = 0;
        food = new Food();
        food.pickLoc();
        this.pickLocSnake();
        this.xspd = 1;
        this.yspd = 0;
    }

    this.getDirectionInNumericalValue = function()
    {
        // Right
        if(this.xspd === 1 && this.yspd === 0)
        {
            return 2;
        }
        // down
        else if(this.xspd === 0 && this.yspd === 1)
        {
            return 3;
        }
        // left
        else if(this.xspd === -1 && this.yspd === 0)
        {
            return 4;
        }
        // up
        else if(this.xspd === 0 && this.yspd === -1)
        {
            return 1;
        }
    }

    this.getNearestWallDistance = function()
    {
        var dwallup = this.y;
        var dwallleft = this.x;
        var dwallright = 580 - this.x;
        var dwalldown = 580 - this.y;

        var temp = [dwallup, dwallright, dwalldown, dwallleft];
        return Math.min(...temp);
    }

    this.generateInput = function()
    {
        // 312 comes from average distance between two random points in a square with side length of 1
        // scaled up by factor of 600
        var euDist = dist(this.x, this.y, food.position()[0], food.position()[1]) / 312;
        var direction = this.getDirectionInNumericalValue();
        var wallDist = this.getNearestWallDistance() / 300;
        var lengthSnake = tail.length;
        var tan = Math.atan2(this.y - food.position()[1], food.position()[0] - this.x);
        var sin = -Math.sin(tan);
        var cos = Math.cos(tan);

        // console.log([[euDist], [direction], [wallDist], [lengthSnake]]);
        return[[euDist], [direction], [wallDist], [lengthSnake], [sin], [cos]];
    }

    this.pickLocSnake = function()
    {
        console.log('picking new location');
        var randX = Math.floor(Math.random() * 10) + 7;
        var randY = Math.floor(Math.random() * 10) + 7;
        this.x = randX * 20;
        this.y = randY * 20;
    }

    
    
}

window.setInterval(function(){
    /// call your function here
    seconds--;
    // console.log(seconds);
    if(seconds === -1)
    {
        console.log('fresh start');
        snake.reset();
        neural.onCreate();
    }
}, 1000);