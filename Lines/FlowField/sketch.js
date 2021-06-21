const { Vector } = require("c:/users/tiny theodore/.vscode/extensions/samplavigne.p5-vscode-1.2.7/p5types");

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
      xOff += increment;

      DrawVector(x, y, v, xOff, yOff);

    }
    yOff += increment;
  }
  fr.html(floor(frameRate()));
  // noLoop();
  start += startInc;
  zOff += zInc;
}

function GetVectorAtPoint(xOff, yOff) {
  var angle = noise(start + xOff, start + yOff) * TWO_PI;
  return p5.Vector.fromAngle(angle);
}

function GetIndex(x, y) {
  return (x + y * width) * 4;
}

function DrawVector(x, y, v, xOff, yOff) {
  stroke(0);
  push();
  translate(x * scl, y * scl);
  rotate(v.heading());

  GetPositionOfClosestAngleNearMe()

  line(0, 0, scl, scl);


  pop();
}
function GetPositionOfClosestAngleNearMe(xOrigin, yOrigin, heading) {
  var yMin = yOrigin - 1;
  var yMax = yOrigin + 1;

  if (y == 0) {
    yMin = 0;
  }

  if (y == rows - 1) {
    yMax = rows - 1;
  }

  var xMin = xOrigin - 1;
  var xMax = xOrigin + 1;

  if (x == 0) {
    xMin = 0;
  }

  if (x == rows - 1) {
    xMax = rows - 1;
  }

  var closestAngle = Math.max;
  var newVec;

  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      var newNewVec = GetVectorAtPoint(xOff, yOff);
      if(abs(heading -newVec.heading()) < closestAngle){
       //   newVec = new Vector(x, y);
      }
    }
  }
  return newVec;
}
