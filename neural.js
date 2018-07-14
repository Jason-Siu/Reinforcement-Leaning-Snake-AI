function Neural()
{
    this.w1 = [];
    this.w2 = [];
    this.b1 = [];
    this.b2 = [];
    this.i1;
    this.i2;
    this.input;
    this.lastMove;
    this.movecheck = -1;
    this.moveHistory = [];
    this.lr = .01;
    this.canEat = false;

    // put random assign values as parameters
    this.onCreate = function()
    {
        // put random values into w1
        this.w1 = [];
        this.w2 = [];
        this.b1 = [];
        this.b2 = [];
        for (let r = 0; r < 5; r++) 
        {
            var temp = [];
            for (let c = 0; c < 6; c++) 
            {
                temp.push(Math.random() - .5);
            }
            this.w1.push(temp);
        }

        // put random values into w2
        for (let r = 0; r < 4; r++) 
        {
            var temp = [];
            for (let c = 0; c < 5; c++) 
            {
                temp.push(Math.random() - .5);
            }
            this.w2.push(temp);
        }

        // put random values into b1
        for (let r = 0; r < 5; r++) 
        {
            var temp = [];
            for (let c = 0; c < 1; c++) 
            {
                temp.push(Math.random() - .5);
            }
            this.b1.push(temp);
        }

        // put random values into b2
        for (let r = 0; r < 4; r++) 
        {
            var temp = [];
            for (let c = 0; c < 1; c++) 
            {
                temp.push(Math.random() - .5);
            }
            this.b2.push(temp);
        }
    }

    // used for debugging
    this.printParams = function()
    {
        console.table(this.w1);
        console.table(this.w2);
        console.table(this.b1);
        console.table(this.b2);
        console.log(this.w1[0][0]);
    }

    // feedforward method
    this.feedForward = function()
    {
        // if die, penalize 
        if(dead)
        {
            dead = false;
            var error = [[0],[0],[0],[0]];
            if(this.moveHistory.length === 2)
            {
                error[this.moveHistory[0]][0] = -1;
                error[this.moveHistory[1]][0] = -1;
                this.moveHistory = [];
            }
            else
            {
                error[this.lastMove][0] = -1;
                this.moveHistory = [];
            }
            // console.log(math.transpose(this.i1));
            var dw2 = math.kron(error, math.transpose(this.i1));
            // console.table(this.w2);
            // console.table(dw2);
            var dh = math.multiply(math.transpose(this.w2), error); 

            // deriv leaky relu
            for (let index = 0; index < dh.length; index++) 
            {
                if(this.i1[index][0] < 0)
                {
                    dh[index][0] = dh[index][0] * .01;
                }
            }
            var dw1 = math.kron(dh, math.transpose(this.input));
            
            // .01 is the learning rate
            this.w2 = math.add(this.w2, math.multiply(dw2, this.lr));
            this.b2 = math.add(this.b2, math.multiply(error, this.lr));


            this.w1 = math.add(this.w1, math.multiply(dw1, this.lr));
            this.b1 = math.add(this.b1, math.multiply(dh, this.lr));

        }
        // if eat food, reward
        if(this.canEat)
        {
            var error = [[0],[0],[0],[0]];
            this.canEat = false;
            // reward
            if(this.moveHistory.length === 2)
            {
                error[this.moveHistory[0]][0] = 1;
                error[this.moveHistory[1]][0] = 1;
                this.moveHistory = [];
            }
            else
            {
                error[this.lastMove][0] = 1;
                this.moveHistory = [];
            }
            // console.log(math.transpose(this.i1));
            var dw2 = math.kron(error, math.transpose(this.i1));
            // console.table(this.w2);
            // console.table(dw2);
            var dh = math.multiply(math.transpose(this.w2), error);

            // deriv leaky relu
            for (let index = 0; index < dh.length; index++) 
            {
                if(this.i1[index][0] < 0)
                {
                    dh[index][0] = dh[index][0] * .01;
                }
            }
            var dw1 = math.kron(dh, math.transpose(this.input));
            
            // this.lr is the learning rate
            this.w2 = math.add(this.w2, math.multiply(dw2, this.lr));
            this.b2 = math.add(this.b2, math.multiply(error, this.lr));


            this.w1 = math.add(this.w1, math.multiply(dw1, this.lr));
            this.b1 = math.add(this.b1, math.multiply(dh, this.lr,));
        }
        
        if(rewardSnakeDist)
        {
            rewardSnakeDist = false;
            var error = [[0],[0],[0],[0]];
            // reward
            error[this.lastMove][0] = .05;
            // console.log(math.transpose(this.i1));
            var dw2 = math.kron(error, math.transpose(this.i1));
            // console.table(this.w2);
            // console.table(dw2);
            var dh = math.multiply(math.transpose(this.w2), error);

            // deriv leaky relu
            for (let index = 0; index < dh.length; index++) 
            {
                if(this.i1[index][0] < 0)
                {
                    dh[index][0] = dh[index][0] * .01;
                }
            }
            var dw1 = math.kron(dh, math.transpose(this.input));
            
            // this.lr is the learning rate
            this.w2 = math.add(this.w2, math.multiply(dw2, this.lr));
            this.b2 = math.add(this.b2, math.multiply(error, this.lr));

            this.w1 = math.add(this.w1, math.multiply(dw1, this.lr));
            this.b1 = math.add(this.b1, math.multiply(dh, this.lr,));
        }
        if(penalizeSnakeDist)
        {
            penalizeSnakeDist = false;
            var error = [[0],[0],[0],[0]];
            // reward
            error[this.lastMove][0] = -.05;
            // console.log(math.transpose(this.i1));
            var dw2 = math.kron(error, math.transpose(this.i1));
            // console.table(this.w2);
            // console.table(dw2);
            var dh = math.multiply(math.transpose(this.w2), error);

            // deriv leaky relu
            for (let index = 0; index < dh.length; index++) 
            {
                if(this.i1[index][0] < 0)
                {
                    dh[index][0] = dh[index][0] * .01;
                }
            }
            var dw1 = math.kron(dh, math.transpose(this.input));
            
            // this.lr is the learning rate
            this.w2 = math.add(this.w2, math.multiply(dw2, this.lr));
            this.b2 = math.add(this.b2, math.multiply(error, this.lr));

            this.w1 = math.add(this.w1, math.multiply(dw1, this.lr));
            this.b1 = math.add(this.b1, math.multiply(dh, this.lr,));
        }
        this.input = snake.generateInput();
        this.i1 = math.multiply(this.w1, this.input);
        this.il = math.add(this.i1, this.b1);
        // leaky relu
        for (let index = 0; index < this.i1.length; index++) 
        {
            if(this.i1[index][0] < 0)
            {
                this.i1[index][0] = this.i1[index][0] * .01;
            }
        }

        this.i2 = math.multiply(this.w2, this.i1);
        // console.log(this.i2);
        this.i2 = math.add(this.i2, this.b2);
        
        var indMax = 0;
        for (let index = 1; index < this.i2.length; index++) 
        {
            if(this.i2[indMax][0] < this.i2[index][0])
            {
                indMax = index;
            }
        }
        
        // pred = [up right down left]
        // up
        
        if(indMax === 0)
        {
            this.lastMove = 0;
            snake.dir(0,-1);
        }
        // right
        else if(indMax === 1)
        {
            this.lastMove = 1;
            snake.dir(1,0);
        }
        // down
        else if(indMax === 2)
        {
            this.lastMove = 2;
            snake.dir(0,1);
        }
        // left
        else if(indMax === 3)
        {
            this.lastMove = 3;
            snake.dir(-1,0);
        }
        if(this.movecheck !== this.lastMove)
        {
            if(this.movecheck === -1)
            {
                this.moveHistory.push(this.lastMove);
                this.movecheck = this.lastMove;
                console.log("negative none");
            }
            else
            {
                this.moveHistory = [];
                this.moveHistory.push(this.movecheck);
                this.moveHistory.push(this.lastMove);
                this.movecheck = this.lastMove;
                console.log("store in move history");
            }
        }
        
    }

}