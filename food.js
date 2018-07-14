function Food()
{
    this.x;
    this.y;

    this.show = function()
    {
        fill(255, 0, 128);
        rect(this.x, this.y, scl, scl);
    }

    
    this.pickLoc = function()
    {
        var availmoves = [];
        for (let i = 0; i < tail.length; i++) 
        {
            var a = tail[i][0];
            var b = tail[i][1];

            locNOSNAKE[floor(a / scl)][floor(b / scl)] = false;
        }

        for (let i= 0; i < locNOSNAKE.length; i++) 
        {
            for (let j = 0; j < locNOSNAKE[0].length; j++) 
            {
                if(locNOSNAKE[i][j])
                {
                    availmoves.push([i, j])
                }
            }
        }

        var randomSpot = availmoves[floor(Math.random() * availmoves.length)]
        this.x = randomSpot[0] * 20;
        this.y = randomSpot[1] * 20;

        
    }


    

    this.position = function()
    {
        return [this.x, this.y];
    }

}