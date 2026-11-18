let numberOfPairs = 25; 
let dHeight = 100;
let rowGap = 30;
let minOvalRatio = 0.8;
let maxOvalRatio = 550 / 350; 
let palette = ["red", "yellow", "green", "orange"];
let fillOptions = [...palette, null];

function setup() {
  createCanvas(495, 825);
  noLoop();
}

function draw() {
  background("black");

  if (numberOfPairs < 1) return;

  let columns = ceil(sqrt(numberOfPairs));
  let rows = ceil(numberOfPairs / columns);
  let cellWidth = width / columns;
  let cellHeight = height / rows;
  let pairScale = min(dHeight / 350, min(cellWidth, cellHeight) / 600);
  let pairHeight = 415 * pairScale;
  let rowStep = min(pairHeight + rowGap, cellHeight);
  let firstRowY = height / 2 - ((rows - 1) * rowStep) / 2;

  for (let i = 0; i < numberOfPairs; i++) {
    let x = (i % columns + 0.5) * cellWidth;
    let y = firstRowY + floor(i / columns) * rowStep;
    let ovalRatio = random(minOvalRatio, maxOvalRatio);
    let fillColor = random(fillOptions);
    let strokeColor = random(palette);
    drawDoubleD(x, y, pairScale, ovalRatio, fillColor, strokeColor);
  }
}

function drawDoubleD(x, y, size = 1, ovalRatio = 550 / 350, fillColor = null, strokeColor = "red") {
  let bowlWidth = max(1, (350 * ovalRatio - 150) / 2);
  let strokeWidth = 40;
  let lineTop = 150 - strokeWidth / 2;
  let lineBottom = 450 + strokeWidth / 2;
  push();
  translate(x, y);
  scale(size);
  translate(-300, -262.5);
  if (fillColor !== null) {
    fill(fillColor);
  } else {
    noFill();
  }
  stroke(strokeColor);
  strokeWeight(strokeWidth);
  strokeCap(SQUARE);

  push();
  translate(150, 0);
  //D1
  arc(200, 300, bowlWidth * 2, 300, -HALF_PI, HALF_PI);
  line(200, lineTop, 200, lineBottom);
  pop();

  push();
  translate(500, 0);
  scale(-1, 1);
  //D2
  arc(200, 300, bowlWidth * 2, 300, -HALF_PI, HALF_PI);
  line(200, lineTop, 200, lineBottom);
  pop();

  drawFourPointStar(325, 70, 70, 30);
  pop();
}

function drawFourPointStar(x, y, outerRadius, innerRadius) {
  push();
  translate(x, y);
  rotate(QUARTER_PI);
  noStroke();
  fill("green");
  beginShape();
  for (let i = 0; i < 8; i++) {
    let angle = -HALF_PI + i * QUARTER_PI;
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    vertex(cos(angle) * radius, sin(angle) * radius);
  }
  endShape(CLOSE);
  pop();
}
