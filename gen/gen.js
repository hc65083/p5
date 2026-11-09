let opacity = 255

//tail
let tailCheckbox
let tailLenSlider 

// lines 1
let lines1NumSlider
let lines1LenSlider
let lines1DistSlider
let lines1SpinSlider
let lines1ColorPicker
let lines1StrokeWeightSlider

// lines 2
let lines2NumSlider
let lines2LenSlider
let lines2DistSlider
let lines2SpinSlider
let lines2ColorPicker
let lines2StrokeWeightSlider

//shots
let shotsNumSlider
let shotsGapSlider
let shotsColorPicker
let shotsLenSlider
let shotsStrokeWeightSlider
let shotsDistSlider

//dots
let dotsNumSlider
let dotsSizeSlider
let dotsDistSlider
let dotsSpinSlider
let dotsColorPicker
let dotsGapSlider

function setup() {
  createCanvas(800, 600);
  strokeWeight(4)
  strokeCap(PROJECT)

  
  createP('Create Your Own Firework')
  createP('Tail')
  tailCheckbox = createCheckbox('Yes', true);
  createElement('label', 'length')
  tailLenSlider = createSlider(30,100, 50)
  
  createP('Shots')
  shotsNumSlider = createSlider(1,10, 1) // min, max, default, step
  createElement('label', 'gap')
  shotsGapSlider = createSlider(50,150, 10)
  createElement('label', 'length')
  shotsLenSlider = createSlider(1,10, 1)
  createElement('label', 'width')
  shotsStrokeWeightSlider  = createSlider(1,10, 1)
  createElement('label', 'distance')
  shotsDistSlider = createSlider(0, 150, 100)
  shotsColorPicker = createColorPicker("#ff2a00")

  // lines 1
  createP('Lines 1')
  createElement('label', 'num')
  lines1NumSlider = createSlider(1,12)
  createElement('label', 'length')
  lines1LenSlider = createSlider(30, 150, 60)
  createElement('label', 'distance')
  lines1DistSlider = createSlider(0, 150, 100)
  createElement('label', 'spin')
  lines1SpinSlider = createSlider(0, 360, 90, 5)
  createElement('label', 'weight')
  lines1StrokeWeightSlider = createSlider(1, 20, 6)
  lines1ColorPicker = createColorPicker("#ffff00")

  // lines 2
  createP('Lines 2')
  createElement('label', 'num')
  lines2NumSlider = createSlider(1,20)
  createElement('label', 'length')
  lines2LenSlider = createSlider(30, 150, 60)
  createElement('label', 'distance')
  lines2DistSlider = createSlider(0, 150, 100)
  createElement('label', 'spin')
  lines2SpinSlider = createSlider(0, 360, 0, 5)
  createElement('label', 'weight')
  lines2StrokeWeightSlider = createSlider(1, 12, 4)
  lines2ColorPicker = createColorPicker("#ff2a00")

  // dots
  createP('Dots')
  createElement('label', 'num')
  dotsNumSlider = createSlider(1,20)
  createElement('label', 'size')
  dotsSizeSlider = createSlider(30, 150, 60)
  createElement('label', 'distance')
  dotsDistSlider = createSlider(0, 150, 100)
  createElement('label', 'spin')
  dotsSpinSlider = createSlider(0, 360, 0, 5)
  dotsColorPicker = createColorPicker("#ff2a00")

  let jpgButton = createButton('Export JPG')
  jpgButton.mousePressed(function() {
    saveCanvas('myCanvas', 'jpg');
  })
}

function draw() {
  background("black");
  translate(width/2, height/2)

  if (tailCheckbox.checked()) {
    drawTail()
  }

  drawLines()
  drawLines2()
  drawShots()
  drawDots()
}

function drawShots() {
  let num = shotsNumSlider.value()
  let gap = shotsGapSlider.value()
  let len = shotsLenSlider.value() 
  let c = color(shotsColorPicker.value())
  c.setAlpha(opacity)

  for(let i = 0; i < num; i++) {
    push()
    strokeWeight(shotsStrokeWeightSlider.value())
    stroke(c)
    rotate(i/num * TWO_PI)
    translate(shotsDistSlider.value() ,0) // dist from center
    rotate(radians(gap))
    line(-len/2,0,len/2,0)
    pop()
  }
}

function drawTail() {
  let len = tailLenSlider.value() 
  let num = shotsNumSlider.value()
  let gap = shotsGapSlider.value()
  let c = color(shotsColorPicker.value())
  c.setAlpha(opacity)
  for(let i = 0; i < num; i++) {
    push()
    strokeWeight(shotsStrokeWeightSlider.value())
    stroke(c)
    rotate(i/num * TWO_PI)
    rotate(radians(gap))
    line(-len/2,0,len/2,0)
    pop()
  }
}

function drawLines() {
  let num = lines1NumSlider.value()  // slider input
  let len = lines1LenSlider.value() //// slider input
  let c = color(lines1ColorPicker.value())
  c.setAlpha(opacity)
  for(let i = 0; i < num; i++) {
    push()
    strokeWeight(lines1StrokeWeightSlider.value())
    stroke(c) // color picker
    // translate(100,0)
    rotate(i/num * TWO_PI)
    translate(lines1DistSlider.value() ,0) // dist from center
    rotate(radians(lines1SpinSlider.value())) // slider input
    line(-len/2,0,len/2,0)
    
    pop()
  }
  
}


function drawLines2() {
  let num = lines2NumSlider.value() // slider input
  let len = lines2LenSlider.value() // slider input
  let c = color(lines2ColorPicker.value())
  c.setAlpha(opacity)
  for(let i = 0; i < num; i++) {
    push()
    stroke(c)
    strokeWeight(lines2StrokeWeightSlider.value())
    rotate(i/num * TWO_PI)
    translate(lines2DistSlider.value(), 0) // distance from the center
    rotate(-radians(lines2SpinSlider.value())) // slider input    
    line(-len/2,0,len/2,0) 
    pop()
  }
}

function drawDots() {
  let num = dotNumSlider.value() // slider input
  let size = dotsSizeSlider.value() // slider input
  let c = color(dotsColorPicker.value())
  c.setAlpha(opacity)
  for(let i = 0; i < num; i++) {
    push()
    stroke(c)
    strokeWeight(dotsStrokeWeightSlider.value())
    rotate(i/num * TWO_PI)
    translate(dotsDistSlider.value(), 0) // distance from the center
    rotate(-radians(dotsSpinSlider.value())) // slider input    
    circle(-size/2,0,size/2,0) 
    pop()
  }
}