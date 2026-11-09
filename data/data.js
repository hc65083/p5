let myData
let gridSize = 200
let cols, rows

async function setup() {
  createCanvas(800, 800);
  cols = int(width/gridSize)
  rows = int(height/gridSize)

  myData = await loadJSON('data.json');
  console.log(myData)
}

function draw() {
  background("rgb(174, 231, 150)");
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
      
      let index = j * cols + i
      let type = myData[index]
      let x = i * gridSize + gridSize/2
      let y = j * gridSize + gridSize/2
      let num = 8
      let c
      let petalLen = 0
      
      if (type.size === "s") {
        petalLen = gridSize * 0.22 // shorter
      } 

      else if (type.size === 'n') {
        petalLen = gridSize * 0.35 // longer
      }

      if (type.petal === "t") {
        c = "skyblue"
      } 

      else if (type.petal === 'f') {
        c = "pink"
      }

    drawFlower(x, y, petalLen, c, type.filament, type.spread, num)
    
    push()
    fill("brown")
    textAlign(CENTER, CENTER)
    text(type.mbti.toUpperCase(), x, y)
    pop()
    }
  }
}

function drawFlower(x, y, petalLen, c, filament, spreadType, num) {

  push()
  translate(x, y)
  let slice = TWO_PI / num
  let petalWidth = petalLen * 0.28
  fill(c)
  stroke("brown")
  strokeWeight(3)

  for (let i = 0; i < num; i++) {
    push()
    rotate(i * slice)
    if (spreadType === 'p' && i % 2 === 1) {
      scale(0.75)
    }

    if (c === "skyblue") {
      triangle(-petalWidth, -petalLen, petalWidth, -petalLen, 0, -12)
    }
    else if (c === "pink") {
      translate(0, -12)
      beginShape()
      bezierVertex(0, 0)
      bezierVertex(-petalWidth * 2, -petalLen * 0.5)
      bezierVertex(-petalWidth, -petalLen * 1.2)
      bezierVertex(0, -petalLen * 0.75)
      bezierVertex(petalWidth, -petalLen * 1.2)
      bezierVertex(petalWidth * 2, -petalLen * 0.5)
      bezierVertex(0, 0)
      endShape(CLOSE)
    }

    pop()
  }
  pop()

  // filament
  push()
  translate(x,y)
  drawFilament(filament)
  pop()

}

function drawFilament(filament) {
  if (filament === 'e') {
    push()
    for (let i = 0; i < 5; i++) {    
      push()
      translate(0, 0)   
      rotate(radians(-60))
      fill("LightYellow")
      stroke("brown")
      strokeWeight(3)
      
      circle(0,0,40)
      pop()
    }
    pop()
  } 

  else if (filament === 'i') {
    fill("LightYellow")
    stroke("brown")
    strokeWeight(3)
    ellipse(0,0,40)
    
  }

}

