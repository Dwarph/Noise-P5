
var increment = 0.1;
var scl = 20;
var cols, rows;

var start = 0;
var startInc = 0.01;

var zOff = 0;
var zInc = 0.0003;

var fr;

var particles = [];
var flowField;

var orange = 'rgb(240, 182, 127)';
var red = 'rgb(254, 95, 85)';
var yellow = 'rgba(255, 234, 112,1)';
var yellowa = 'rgba(255, 234, 112,.25)';
var blue = 'rgba(71, 171, 194, 1)';


var backgroundColor = blue;
var particleColour = yellow;


function setup() {
  createCanvas(400, 400);
  // noiseDetail(4);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  clear();
  background(backgroundColor);
  var yOff = 0;
  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xOff, yOff, zOff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      flowField[index] = v;
      xOff += increment;
      stroke(yellowa);

      push();
      strokeWeight(1);
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, scl);
      pop();

    }
    yOff += increment;
    zOff += zInc;
  }
  
  // noLoop();
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  
  fr.html(floor(frameRate()));
}


