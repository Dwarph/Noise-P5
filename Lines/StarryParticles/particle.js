function Particle() {

    var colourPalette1 = [
        { value: 'rgb(102, 106, 134)', weight: 1},
        { value: 'rgb(255, 234, 112)', weight: 1},
        { value: 'rgb(238, 148, 128)', weight: 1},
        { value: 'rgb(127, 216, 190)', weight: 1},
        { value: 'rgb(108, 212, 255)', weight: 1},
    ]

    var colourPalette2 = [
        { value: 'rgb(37, 142, 166)', weight: 1},
        { value: 'rgb(84, 159, 147)', weight: 1},
        { value: 'rgb(159, 175, 144)', weight: 1},
        { value: 'rgb(226, 177, 177)', weight: 1},
        { value: 'rgb(226, 194, 255)', weight: 1}
    ]

    var iceCreamPallette = [
        {value: 'rgb(238, 148, 128)', weight: 1},
        {value: 'rgb(240, 164, 147)', weight: 1},
        {value: 'rgb(226, 74, 40)', weight: 1},
        {value: 'rgb(231, 104, 75)', weight: 1},
    ] 
    
    var colourPalette3 = [
        {value:'rgb(5, 55, 66)', weight: 1},
        {value:'rgb(57, 162, 219)', weight: 1},
        {value:'rgb(162, 219, 250)', weight: 1},
        {value:'rgb(232, 240, 242)', weight: 1},
    ]

    var fire1 = [
        {value: '#bf481d', weight: 1},
        {value: '#d97e16', weight: 1},
        {value: '#e5be22', weight: 1},
        {value: '#f2e749', weight: 1},
    ]

    var fire2 = [
        {value:'#ffe808', weight: 1},
        {value:'#ffce00', weight: 1},
        {value:'#ff9a00', weight: 1},
    ]

    var theWave = [
       {value: '#7E9CA7', weight: 5},
       {value: '#C1B8A9', weight: 1},
       {value: '#072349', weight: 6},
       {value: '#454A4D', weight: 1},
    ]
    
    var starryNight = [
       {value: '#175781', weight: 50},
       {value: '#FECF3C', weight: 25},
       {value: '#F8E389', weight: 20},
       {value: '#A0C899', weight: 30},
    ]



    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 6;
    this.minSpeed = 4;
    this.minWeight = 5;
    this.sWeight = 20;
    this.pColour = '#ffe808';

    this.setup = function() {
        this.pColour = chooseWeighted(starryNight);
        this.sWeight = getRandomInt(20) + 1;
        if(this.sWeight < this.minWeight){
            this.sWeight = this.minWeight;
        }
        this.maxSpeed = this.sWeight /5;
        if(this.maxSpeed < this.minSpeed){
            this.maxSpeed = this.minSpeed;
        }
    }

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.show = function () {
        stroke(this.pColour);
        strokeWeight(this.sWeight);
        point(this.pos.x, this.pos.y);
    }

    this.edges = function () {
        var changed = false;
        if (this.pos.x > width) {
            this.pos = createVector(0, random(height));
            changed = true;
        }
        if (this.pos.x < 0) {
            this.pos = createVector(width, random(height));
            changed = true;
        }
        if (this.pos.y > height) {
            this.pos = createVector(random(width), 0);
            changed = true;
        }
        if (this.pos.y < 0) {
            this.pos = createVector(random(width), height);
            changed = true;
        }
        if (changed) {
            this.setup();
        }
    }



    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = findClosestVec(this.pos.x, this.pos.y, vectors).vec;
        this.applyForce(force);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomGaussianInt(mid, max){
    let val = randomGaussian();
  
    let sd = max;            
    let mean = mid           
    return x = ( val * sd ) + mean;  // Scale the gaussian random number by standard deviation and mean
}

function findClosestVec(xPos, yPos, vectors){
    var ind = 0;
    var closestVec = vectors[0];
    var closestDist = Math.abs((xPos-vectors[0].pos.x) + (yPos-vectors[0].pos.y));
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var index = x + y * cols;
            
          var currentDist = Math.abs((xPos-vectors[index].pos.x) + (yPos-vectors[index].pos.y));
            if(closestDist > currentDist){
                closestVec = vectors[index];
                closestDist = currentDist;
                ind = index;
            }
        }
    }

    return closestVec;
}

function chooseWeighted(opts) {

    // get sum of all the weights.
    var sum = 0;
    for(var i = 0; i < opts.length; i++) {
     sum += opts[i].weight 
    }
  
    // now pick a random number between 0 and the sum of the weights
    var ran = random(sum);
  
    // loop through all the options until you find a weight that is greater
    // or equal to the random number. Subtract weight from random num every time.
    for( var i = 0; i < opts.length; i++){
  
      var opt = opts[i];
  
      if(opt.weight >= ran) {
        return opt.value;
      }
  
      ran -= opt.weight;
    }
  }

