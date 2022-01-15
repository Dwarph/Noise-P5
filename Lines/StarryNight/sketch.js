
var increment = 0.01;
var scl = 20;
var cols, rows;

var start = 0;
var startInc = 0.01;

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

var vectorForceScale = 0.1;


var backgroundColor = orange;

var theWaveBg = '#DED4C5';
var starryNightBg = '#010406';
var bgC = '#00000';


function setup() {
  createCanvas(400, 400);
   noiseDetail(3);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (var i = 0; i < 6; i++) {
    particles[i] = new Particle();
    particles[i].setup();
  }
  bgC = starryNightBg;
  background(bgC);

  createLoop({duration:20, gif:true})
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var v = createVector( (200 - (x * scl)) * vectorForceScale, (200 - (y * scl)) * vectorForceScale);
      v.setMag(0.7);
      flowField[index] = {
        vec: v,
        pos: createVector(x * scl, y * scl)
      }
    }
  }

}

function draw() {
 // clear();
  //background(backgroundColor);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      
      //flowField[index].pos = rotate_point(200, 200, 0, flowField[index].pos);

      stroke(bgC);
      push();
      strokeWeight(3);
      translate(flowField[index].pos.x, flowField[index].pos.y);
      rotate(flowField[index].vec.heading());
     // line(0, 0, scl, scl);
      pop();
    }
  }


  //noLoop();
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField, 1);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }


  fr.html(floor(frameRate()));
}

function rotate_point(pivot_x, pivot_y, angle, p)
{
  var s = sin(angle);
  var c = cos(angle);

  // translate point back to origin:
  p.x -= pivot_x;
  p.y -= pivot_y;

  // rotate point
  var xnew = p.x * c - p.y * s;
  var ynew = p.x * s + p.y * c;

  // translate point back:
  p.x = xnew + pivot_x;
  p.y = ynew + pivot_y;
  return p;
}

