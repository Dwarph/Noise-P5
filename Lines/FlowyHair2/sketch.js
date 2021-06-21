
var increment = 0.1;
var scl = 10;
var cols, rows;

var start = 0;
var startInc = 0.01;

var zOff = 0;
var zInc = 0;

var fr;

function setup() {
  createCanvas(400, 400);
  // noiseDetail(4);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
}

function draw() {
  clear();
  var yOff = 0;

  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      var v = GetVectorAtPoint(xOff, yOff);
      xOff = increment*x;

      DrawVector(x, y, v, xOff, yOff);

    }
    yOff = increment*y;
  }
  fr.html(floor(frameRate()));
  // noLoop();
  start += startInc;
  zOff += zInc;
}

function GetVectorAtPoint(x, y) {
  var angle = noise(start + (x*increment), start + (y*increment)) * TWO_PI;
  return p5.Vector.fromAngle(angle);
}

function DrawVector(x, y, v, xOff, yOff) {
  stroke(0);
  push();
  translate(x * scl, y * scl);
  rotate(v.heading());
  line(0, 0, scl, scl);
  pop();
}

