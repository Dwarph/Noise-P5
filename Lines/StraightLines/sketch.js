
var orange = 'rgb(240, 182, 127)';
var red = 'rgb(254, 95, 85)';
var yellow = 'rgba(255, 234, 112,1)';
var yellow2 = 'rgba(252, 246, 218,1)';
var yellowa = 'rgba(255, 234, 112,.25)';
var blue = 'rgba(71, 171, 194, 1)';

var colourPalette1 = [
  'rgb(102, 106, 134)',
  'rgb(255, 234, 112)',
  'rgb(255, 234, 112)',
  'rgb(238, 148, 128)',
  'rgb(238, 148, 128)',
  'rgb(127, 216, 190)',
  'rgb(127, 216, 190)',
  'rgb(108, 212, 255)',
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

var blues = [
  'rgb(173, 215, 246)',
  'rgb(135, 191, 255)',
  'rgb(63, 142, 252)',
  'rgb(38, 103, 255)',
  'rgb(59, 40, 204)'
]

var rainbow = [
  'rgb(249, 65, 68)',
  'rgb(249, 65, 68)',
  'rgb(249, 65, 68)',
  'rgb(243, 114, 44)',
  'rgb(248, 150, 30)',
  'rgb(249, 132, 74)',
  'rgb(249, 199, 79)',
  'rgb(144, 190, 109)',
  'rgb(67, 170, 139)',
  'rgb(77, 144, 142)',
  'rgb(87, 117, 144)',
  'rgb(39, 125, 161)',
  'rgb(39, 125, 161)',
]



var backgroundColor = yellow2;

var colours;
function setup() {
  colours = rainbow;
  createCanvas(400, 400);
  noiseDetail(2);
  frameRate(200);

  fr = createP('');

  background(backgroundColor);

  createLoop({ duration: 7, gif: true })

  x = random(0,200);
  xEnd = random(height-100, height);
  y = random(0,50);
}

var x;
var y;

var xEnd;

var xaddition = 20;
var yaddition = 50;
let stop = false;
function draw() {
if(stop){ return;}

 // clear();

  //for (var x = 0; x < width; x++) {
  //  for (var y = 0; y < height; y++) {

  
  let noiseVal = noise(x, y);
   var color = colours[round(map(noiseVal, 0, 1, 0, colours.length-1))];

   stroke(color);
  // stroke(random(255), random(255), random(255), random(255));
   strokeWeight(noiseVal * 55);

  if (random(100) < 20)
    line(x, y, y, y + ((height - y) * noiseVal));

  let xrandVar = xaddition + random(-xaddition / 1.5, xaddition / 1.5);
  let yrandVar = yaddition + random(-yaddition / 1.5, yaddition / 1.5);
 
  if(y >= width){
    y = 0;
    x = x + xrandVar;
  }
  y = y + yrandVar;

  if(x>= xEnd){
    stop = true;
    return;
    x = 0;
    y = 0;
    clear();
    background(backgroundColor);

  }

  print(x);
  print(y);

  //    }
  //  }


  fr.html(floor(frameRate()));
}

