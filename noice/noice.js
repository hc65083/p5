let cats = []
let palette = ['#240903', '#ff861c', '#F2C14E', '#ffffff', '#a26b19']

function setup() {
  createCanvas(600, 600)
  for (let i = 0; i < 14; i++) {
    cats.push(makeCat(random(width), random(height)))
  }
}

function makeCat(x, y) {
  return {
    x: x,
    y: y,
    size: random(40, 80),
    seed: random(1000),    // its own place in the noise landscape
    t: 0,                  // its own noise "time"
    life: random(900, 1800),
    c: random(palette)
  }
}

function draw() {
     background('#f2d591')

  // a new creature now and then, so the room never empties
  if (frameCount % 120 === 0 && cats.length < 10) {
    cats.push(makeCat(random(width), random(height)))
  }

  for (let i = cats.length - 1; i >= 0; i--) {
    let c = cats[i]
    let d = dist(c.x, c.y, mouseX, mouseY)
    let cactivated = d < 120

    // 1. wander: noise picks a speed in x and in y
    c.x += map(noise(c.seed, c.t), 0, 1, -2, 2)
    c.y += map(noise(c.seed + 500, c.t), 0, 1, -2, 2)

    // 2. follow the mouse when it is nearby
    if (cactivated) {
      let go = atan2(mouseY - c.y, mouseX - c.x)
      c.x += cos(go) * 4
      c.y += sin(go) * 4
    }
    c.x = constrain(c.x, 0, width)
    c.y = constrain(c.y, 0, height)

    // 3. mood: an excited cat moves through noise faster, so it wobbles more
    if (cactivated) {
      c.t += 0.08
    } else {
      c.t += 0.01
    }

    c.life -= 1
    drawCat(c, cactivated)

    if (c.life <= 0) {
      cats.splice(i, 1)
    }
  }
}

function drawCat(c, cactivated) {
  push()
  translate(c.x, c.y)

  // body
  let col = color(c.c)
  fill(col)
  noStroke()
  let size = c.size * map(sin(frameCount * 0.05), -1, 1, 0.9, 1.1)

  //ears
  triangle(-size * 0.45, -size * 0.2,
           -size * 0.4, -size * 0.65,
           -size * 0.05, -size * 0.4)
  triangle(size * 0.45, -size * 0.2,
           size * 0.4, -size * 0.65,
           size * 0.05, -size * 0.4)

  //mouth
  circle(0, 0, size)

  // eyes
  let e = c.size * 0.18
  let eyeScale = cactivated ? 1.5 : 1
  
    let look = atan2(mouseY - c.y, mouseX - c.x)   // where the mouse is
    for (let side = -1; side <= 1; side += 2) {
      let ex = side * e * 1.1
      fill(0)
      circle(ex, -e * 0.3, e * 1.6 * eyeScale)
      noStroke()
      fill("white")
      circle(ex + cos(look) * e * 0.35 * eyeScale,
             -e * 0.3 + sin(look) * e * 0.35 * eyeScale,
             e * 0.7 * eyeScale)
      stroke(20, 22, 31)
    }

  let mouthHalf = size * 0.05
  let mouthY = size * 0.2
  if (cactivated) {
    noStroke()
    fill("pink")
    circle(0, mouthY, mouthHalf * 2)
  } else {
    stroke(20, 22, 31)
    strokeWeight(2)
    line(-mouthHalf, mouthY - mouthHalf, mouthHalf, mouthY + mouthHalf)
    line(-mouthHalf, mouthY + mouthHalf, mouthHalf, mouthY - mouthHalf)
  }
pop()
}
