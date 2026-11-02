let cols
let rows
let gridSize = 40
  
function setup() {
  createCanvas(600, 600);
  cols = int(width/gridSize)
  rows = int(height/gridSize)
}

function draw() {
  background("black");
  
  // for(let i = 0; i < width ; i+=40)
  // {
  //   circle(i+20,0,40)
  // }

  for(let i = 0; i < cols ; i++) {
    for (let j = 0; j < rows; j++) 
    {
      let x = i * gridSize + gridSize/2
      let y = j * gridSize + gridSize/2

      let d = dist(x,y,mouseX,mouseY)
      let circleSize = map(d,0,400,gridSize, gridSize*0.2)
      let r = map (x,0,width,20,250)
      let b = map (y,0,height,0,250)
    
      // rect(x,y,gridSize)
      if (j % 2 === 0) {
        noStroke()
        fill(r,30,b,200-d)
      }
      else {
        noFill()
        stroke("white")
      }
      circle(x,y,circleSize)
    }
  }

  // rectMode(CENTER)
}