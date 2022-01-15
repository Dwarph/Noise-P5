
var increment = 0.01;
var scl = 20;
var cols, rows;

var start = 0;
var startInc = 0.01;

var zOff = 0;
var zInc = 0.0000;

var fr;

var particles = [];
var flowField;

var orange = 'rgb(240, 182, 127)';
var red = 'rgb(254, 95, 85)';
var yellow = 'rgba(255, 234, 112,1)';
var yellow2 = 'rgba(252, 246, 218,1)';
var yellowa = 'rgba(255, 234, 112,.25)';
var blue = 'rgba(71, 171, 194, 1)';




var backgroundColor = yellow2;


function setup() {
  createCanvas(400, 400);
   noiseDetail(3);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (var i = 0; i < 1; i++) {
    particles[i] = new Particle();
  }
  background(backgroundColor);

  createLoop({duration:20, gif:true})


}

function draw() {
  //clear();
  var yOff = 0;
  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xOff, yOff, zOff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.7);
      flowField[index] = v;
      xOff += increment;
      stroke(yellowa);

      push();
      strokeWeight(1);
      translate(x * scl, y * scl);
      rotate(v.heading());
      //  line(0, 0, scl, scl);
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

