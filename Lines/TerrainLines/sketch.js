
var increment = 0.005;
var scl = 5;
var cols, rows;


var start = 0;
var startInc = 0.01;

var zOff = 0;
var zInc = 0;

var fr;

var flowPoints = [];

var orange = 'rgb(240, 182, 127)';
var red = 'rgb(254, 95, 85)';
var yellow = 'rgba(255, 234, 112,1)';
var blue = 'rgba(71, 171, 194, 1)';


var backgroundColor = blue;
var flowColor = yellow;

function setup() {
  // colorMode(RGB, 255);

  createCanvas(800, 800);
  // noiseDetail(4);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  PopulateFlowPoints();
  noLoop();
}

function draw() {
  PopulateFlowPoints();
  background(backgroundColor);

  //DrawHair();
  DrawFlowLines();
  //testDraw();
  fr.html(floor(frameRate()));
  start += startInc;
  zOff += zInc;
}
var y = 0;
function DrawFlowLines() {
  stroke(flowColor);
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var flowPoint = getFlowPointAtIndex(x, y);
      if (isBoundary(flowPoint)) {
        point(flowPoint.x * scl, flowPoint.y * scl);
        increment++;
      }
    }
  }
  print("drawn");
}

function isBoundary(flowPoint) {
  noFill();
  strokeWeight(2);
  for (var y = flowPoint.y - 1; y < flowPoint.y + 2; y++) {
    if (y < 0) { y = 0; continue; }
    if (y > rows - 1) { break; }

    for (var x = flowPoint.x - 1; x < flowPoint.x + 2; x++) {
      if (x < 0) { x = 0; continue; }
      if (x > rows - 1) { break; }

      if (x == flowPoint.x && y == newFlowPoint.y) {
        continue;
      }

      var newFlowPoint = getFlowPointAtIndex(x, y);

      if (newFlowPoint.noise != flowPoint.noise) {
        return true;
      }
    }
  }
  return false;
}

function PopulateFlowPoints() {
  flowPoints = [];
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      let flowPoint = {
        "x": x,
        "y": y,
        "xOff": x * increment,
        "yOff": y * increment,
        "noise": round(noise(start + (x * increment), start + (y * increment)), 1),
        "used": false
      }
      flowPoints.push(flowPoint);
    }
  }
}

function getFlowPointAtIndex(x, y) {
  return flowPoints.find(e => e.x == x && e.y == y);
}

function DrawVector(x, y, v, xOff, yOff) {
  stroke(0);
  push();
  translate(x * scl, y * scl);
  rotate(v.heading());
  line(0, 0, scl, scl);
  pop();
}

