function setup() {
  createCanvas(400, 400);
}

// var xOffset = 0;
// var xOffset2 = 0;

var increment = 0.01;
var start = 0;

function draw() {
  // var x = random(width);
  // var x = map(noise(xOffset), 0, 1, 0, width);
  // var y = map(noise(xOffset2), 0, 1, 0, width);

  // xOffset += 0.01;
  // xOffset2 += 0.005;
  // ellipse(x, y, 24, 24)

  background(51);


  stroke(255);
  noFill();
  beginShape();

  var xOffset = start;
  for (var x = 0; x < width; x++) {
    stroke(255);
    // var y = noise(xOffset) * height;

    var n = map(noise(xOffset), 0, 1, -50, 50);
    var s = map(sin(xOffset), -1, 1, 0, height);
    var y = n + s;
    vertex(x, y);
    xOffset += increment;
  }


  endShape();
   start += increment;
  // noLoop();
}
