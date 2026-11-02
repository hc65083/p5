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
  background("beige");

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
      
      let type = myData[i]
      let x = i * gridSize + gridSize/2
      let y = j * gridSize + gridSize/2
      let num = 8
      let c
      let petalLen = 0
      
      if (type.size === "s") {
        petalLen = gridSize * 0.4 // shorter
      } 

      else if (type.size === 'n') {
        petalLen = gridSize * 0.6 // longer
      }

      if (type.petal === "t") {
        c = "skyblue"
      } 

      else if (type.petal === 'f') {
        c = "pink"
      }

     drawFlower(x, y, petalLen, c, type.filament, type.spread, num)
    }
  }
}

function drawFlower(x, y, petalLen, c, filament, spreadType, num) {

  // petals
  push()
  translate(x, y)
  let slice = TWO_PI / num
  let gap = slice * 0.3 // small gap between petals
  
  if (c === "skyblue") {
    
    for (let i = 0; i < num; i++) {
      let petal = slice - gap
      push()
      rotate(i * slice)
      translate(5, 0) // dist from center
      fill(c)
      triangle(0,0, 64, 64, -petal/2, petal/2)
      pop()
    }
  }

  else if (c === "pink") {
    for (let i = 0; i < num; i++) {
      let petal = slice - gap
      
      push()
      rotate(i * slice)
      translate(5, 0)
      fill(c)
      triangle(0,0, 64, 64, -petal/2, petal/2)
      pop()
    }
  }  

  pop()
  
  // spread
  let spread = 20
  let waviness = 10   
  let waveFreq = 0.05 

  push()
  translate(x, y)

  for (let i = 0; i < num; i++) {
    let d = petalLen * (i + 1) / (num + 1)   // how far down the stem
    let wave = sin(d * waveFreq) * waviness  // where the stem is at that height
    push()
    translate(wave, d)
    if (i%2===0) scale(-1,1)
    translate(8, 0)    // dist from mid
    rotate(radians(-60))
    fill(c)
    rect(0, 0, spread, spread, 0, spread / 2, spread / 2, spread / 2)
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
    fill("LightYellow")
    circle(0,0,20)
  } 

  else if (filament === 'i') {
    fill("LightYellow")
    ellipse(0,0,30)
  }

}

