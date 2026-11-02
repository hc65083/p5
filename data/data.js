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
  background("paper");

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
        petalLen = gridSize * 0.2 // shorter
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
    fill("black")
    noStroke()
    textAlign(CENTER, CENTER)
    text(type.mbti.toUpperCase(), x, y)
    pop()
    }
  }
}

function drawFlower(x, y, petalLen, c, filament, spreadType, num) {

  // petals
  push()
  translate(x, y)
  let slice = TWO_PI / num
  let gap = slice * 0.3 // small gap between petals
  
//  if (c === "skyblue") {
//     push()
//        for (let i = 0; i < num; i++) {
//       let petal = slice - gap
     
//       push()
//       translate(0, 0) // dist from center
//       rotate(i * slice)
//       fill(c)
//       triangle(0,0, 64, 64, petal/2, petal/2)
//       pop()
//     }
//   pop()
//   }

  // else if (c === "pink") {


  pop()
  
  // spread
  let spread = 20
  let waviness = 10   
  let waveFreq = 0.05 

  // push()
  // translate(x, y)

  // for (let i = 0; i < num; i++) {
  //   let d = petalLen * (i + 1) / (num + 1)   // how far down the stem
  //   let wave = sin(d * waveFreq) * waviness  // where the stem is at that height
    
  //   push()
  //   translate(wave, d)
  //   if (i%2===0) scale(-1,1)
  //   translate(0, 0)    // dist from mid
  //   rotate(radians(-60))
  //   fill(c)
  //   rect(0, 0, spread, spread, 0, spread / 2, spread / 2, spread / 2)
  //   pop()
  // }

  // pop()

  push()
  translate(x, y)

  for (let i = 0; i < num; i++) {    
    push()
    if (i%2===0) scale(-1,1)
    translate(0, 0)    // dist from mid
    rotate(i*slice)
    fill(c)
    rect(0, 0, petalLen, petalLen, 0, petalLen / 2, petalLen / 2, petalLen / 2)
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
      circle(0,0,40)
      pop()
    }
    pop()
  } 

  else if (filament === 'i') {
    fill("LightYellow")
    ellipse(0,0,40)
  }

}

