let numberOfPairs = 1; // Change this to draw more pairs.

function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(255);
  
  if (numberOfPairs < 1) return;

  let columns = ceil(sqrt(numberOfPairs));
  let rows = ceil(numberOfPairs / columns);
  let cellWidth = width / columns;
  let cellHeight = height / rows;
  let pairScale = min(cellWidth, cellHeight) / 600;

  for (let i = 0; i < numberOfPairs; i++) {
    let x = (i % columns + 0.5) * cellWidth;
    let y = (floor(i / columns) + 0.5) * cellHeight;
    drawDoubleD(x, y, pairScale);
  }
}

// x and y position the pair's center; size scales the whole formation.
function drawDoubleD(x, y, size = 1) {
  push();
  translate(x, y);
  scale(size);
  translate(-300, -300);
  noFill();
  stroke(0);
  strokeWeight(50);
  strokeCap(ROUND);

  // Place the first D on the right.
  push();
  translate(150, 0);
  //D1
  line(200, 150, 200, 450);
  arc(200, 300, 400, 300, -HALF_PI, HALF_PI);
  pop()
  pop();

   // Place the horizontally flipped D on the left.
  push();
  translate(450, 0);
  scale(-1, 1);
  //D2
  line(200, 150, 200, 450);
  arc(200, 300, 400, 300, -HALF_PI, HALF_PI);
  pop();
  pop();
pop()
pop()
}
