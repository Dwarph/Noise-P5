function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  noiseDetail(4);
}

var increment = 0.005;

function draw() {
  var yOff = 0;
  
  loadPixels();
  for (var x = 0; x < width; x++) {
    var xOff = 0;
    for (var y = 0; y < height; y++) {
      var index = (x + y * width) * 4;
      var r = noise(xOff, yOff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xOff += increment;
    }
    yOff += increment;
  }
  updatePixels();
}
