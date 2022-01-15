function Particle() {

    var colourPalette1 = [
        'rgb(102, 106, 134)',
        'rgb(255, 234, 112)',
        'rgb(238, 148, 128)',
        'rgb(127, 216, 190)',
        'rgb(108, 212, 255)']

    var colourPalette2 = [
        'rgb(37, 142, 166)',
        'rgb(84, 159, 147)',
        'rgb(159, 175, 144)',
        'rgb(226, 177, 177)',
        'rgb(226, 194, 255)']

    var iceCreamPallette = [
        'rgb(238, 148, 128)',
        'rgb(240, 164, 147)',
        'rgb(226, 74, 40)',
        'rgb(231, 104, 75)'
    ] 
    
    var colourPalette3 = [
        'rgb(5, 55, 66)',
        'rgb(57, 162, 219)',
        'rgb(162, 219, 250)',
        'rgb(232, 240, 242)'
    ]

    this.pos = createVector(0, random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 10;
    this.sWeight = 20;
    this.pColour = 'rgb(5, 55, 66)';

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
            this.pColour = colourPalette3[getRandomInt(colourPalette3.length)];
            this.sWeight = getRandomInt(20) + 1;
        }
    }




    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
