let cats = []
let palette = ['#FF6B4A', '#4FD1C5', '#F2C14E', '#7C9CFF', '#C98AE0']

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
     background('#F3EFE6')

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

    // 2. run away from the mouse
    if (cactivated) {
      let away = atan2(c.y - mouseY, c.x - mouseX)
      c.x += cos(away) * 4
      c.y += sin(away) * 4
    }
    c.x = constrain(c.x, 0, width)
    c.y = constrain(c.y, 0, height)

    // 3. mood: a scared creature moves through noise faster, so it wobbles more
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
 let asleep = c.life < 180
  let alphaValue = 255
  if (asleep) {
    alphaValue = map(c.life, 0, 180, 0, 255)   // fade out while sleeping
  }

  push()
  translate(c.x, c.y)

  // body
  let col = color(c.c)
  col.setAlpha(alphaValue)
  fill(col)
  stroke(20, 22, 31, alphaValue)
  strokeWeight(3)
  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.2) {
    let n = noise(c.seed + cos(a) + 1, c.seed + sin(a) + 1, c.t)
    let r = c.size / 2 * map(n, 0, 1, 0.7, 1.3)
    vertex(cos(a) * r, sin(a) * r)
  }
  endShape(CLOSE)

  // eyes
  let e = c.size * 0.18
  
  if (cactivated) {
//     // closed eyes
//     line(-e * 1.6, -e * 0.3, -e * 0.6, -e * 0.3)
//     line(e * 0.6, -e * 0.3, e * 1.6, -e * 0.3)
//   
    let look = atan2(mouseY - c.y, mouseX - c.x)   // where the mouse is
    for (let side = -1; side <= 1; side += 2) {
      let ex = side * e * 1.1
      fill(255, alphaValue)
      strokeWeight(2)
      circle(ex, -e * 0.3, e * 1.6)
      noStroke()
      fill(20, 22, 31, alphaValue)
      circle(ex + cos(look) * e * 0.35, -e * 0.3 + sin(look) * e * 0.35, e * 0.7)
      stroke(20, 22, 31, alphaValue)
    }
  }
pop()
}
