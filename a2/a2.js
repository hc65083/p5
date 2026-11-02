let gridSize = 40
let cols, rows
function setup() {
  createCanvas(800, 800);
  cols = int(width/gridSize)
  rows = int(height/gridSize)
}


function draw() {
  background("black");
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * gridSize + gridSize/2
      let y = j * gridSize + gridSize/2
      
      let upValue = map(sin(frameCount*0.1+i+j), -1, 1, -10, 10)
      push()
      
      let d = dist(x,y,mouseX,mouseY)
      let circleSize = map(d,0,400,gridSize, gridSize*0.2)
      let r = map (x,0,width,20,250)
      let b = map (y,0,height,0,250)
    
      noStroke()
      fill("white")

        circle(x,y,circleSize)

        translate(0,upValue) // wave
        translate(x, y) 
      
        // mouth
        push()
        fill("black")
        triangle(0,0+gridSize*0.1, 0+gridSize*2, gridSize*0.1,gridSize*0.1,gridSize*2)
        rotate(frameCount*0.1)
        pop()
      
        // eyes
        push()
        fill("black")
        let size = map(sin((frameCount*0.1+i+j)), -1, 1, gridSize*2, gridSize*2)
        circle(0+size*.3,0-size*.3, size*.2) 
        pop()

      pop()
      
    }
  }
}
// 3-2 Generative Patterns
// Design and create a pattern that changes dynamically 
// with nested for loops. Combine conditionals (if/else), 
// modulo (%), random(), or map() to create variation across the pattern. 
// Use transformations such as push(), pop(), translate(), rotate(), scale(), 
// and shearX() to draw each item in the grid. To animate it, 
// try frameCount with sin() or cos(), or respond to the mouse with mouseX and mouseY.