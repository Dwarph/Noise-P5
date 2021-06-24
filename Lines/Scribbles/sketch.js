
var increment = 0.1;
var scl = 10;
var cols, rows;


var start = 0;
var startInc = 0.01;

var zOff = 0;
var zInc = 0;

var fr;

var flowPoints = [];

function setup() {
  createCanvas(400, 400);
  // noiseDetail(4);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  PopulateFlowPoints();

}

function draw() {
  PopulateFlowPoints();
  clear();
  //DrawHair();
  DrawFlowLines();
  //testDraw();
  fr.html(floor(frameRate()));
  noLoop();
  start += startInc;
  zOff += zInc;
}

function DrawHair() {
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var flowPoint = getFlowPointAtIndex(x, y);
      var v = GetVectorFromFlowPoint(flowPoint);
      DrawVector(x, y, v, flowPoint.xOff, flowPoint.yOff);
    }
  }
}

function DrawFlowLines() {
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var flowPoint = getFlowPointAtIndex(x, y);
      DrawLineFromPoint(flowPoint);
    }
  }
}

function testDraw() {
  noFill();
  strokeWeight(1);

  beginShape();
  curveVertex(84, 91);
  curveVertex(84, 91);
  curveVertex(68, 19);
  curveVertex(21, 17);
  curveVertex(32, 91);
  curveVertex(32, 91);
  endShape();
}

var minLineLength = 10;
var maxLineLength = 10;
var searchAreaMin = 5;
var searchAreaMax = 5;


function DrawLineFromPoint(flowPoint) {
  noFill();
  strokeWeight(1);


  var i = 0;
  beginShape();
  while (i < maxLineLength) {
    var noiseValue = Number.MAX_VALUE;
    var closestX, closestY;
    for (var y = flowPoint.y - searchAreaMin; y < flowPoint.y + searchAreaMax; y++) {
      if (y < 0) { y = 0; continue; }
      if (y > rows - 1) { break; }

      for (var x = flowPoint.x - searchAreaMin; x < flowPoint.x + searchAreaMax; x++) {
        if (x < 0) { x = 0; continue; }
        if (x > rows - 1) { break; }

        var newFlowPoint = getFlowPointAtIndex(x, y);
        if (newFlowPoint.x == flowPoint.x && newFlowPoint.y == newFlowPoint.y) {
          continue;
        }
          if (!newFlowPoint.used) {
        if (abs(flowPoint.noise - newFlowPoint.noise) < noiseValue) {
          noiseValue = abs(flowPoint.noise - newFlowPoint.noise);
          closestX = x;
          closestY = y;
        }
        }
      }
    }

    if (closestX == null) {
      break;
    }
    var curveVertexFlowPoint = getFlowPointAtIndex(closestX, closestY);
    curveVertex(curveVertexFlowPoint.x * scl, curveVertexFlowPoint.y * scl);
    // console.log("curveVertex at: " + curveVertexFlowPoint.x + ", " + curveVertexFlowPoint.y);
    curveVertexFlowPoint.used = true;
    flowPoint = curveVertexFlowPoint;
    if (flowPointAtBoundary(curveVertexFlowPoint)) { break; }
    i++;
  }
  // console.log("END");
  endShape();
}

function flowPointAtBoundary(flowPoint) {
  return flowPoint.x == 0 || flowPoint.y == 0 || flowPoint.x == cols - 1 || flowPoint.y == rows - 1;
}

function GetVectorFromFlowPoint(flowPoint) {
  var angle = flowPoint.noise * TWO_PI;
  return p5.Vector.fromAngle(angle);
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
        "noise": noise(start + (x * increment), start + (y * increment)),
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

