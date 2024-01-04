console.log('init222')

const canvas = document.querySelector('#rainny')
const ctx = canvas.getContext("2d")
const ww = canvas.width = window.innerWidth
const wh = canvas.height = window.innerHeight - 90
const dataArr = []
let step = 0

const imgRed = new Image();
imgRed.src = "./images/red.png";
const imgGold = new Image();
imgGold.src = "./images/gold.png";

const imgArr = [imgRed, imgGold]

class Envelope {
  constructor(x, y,rotate, pic) {
    this.x = x
    this.y = y
    this.rotate = rotate
    this.pic = pic
  }
  move() {
    const angle = step * Math.PI / 180
    const www = Math.sin(angle) * 50

    this.y *= 1.02
    this.x += www

    if (this.y > wh) {
      this.y = Math.random() * (wh / 3)
      if (this.x > ww) {
        this.x = Math.random() * (ww / 3) - 100
      }
    }
  }

  rotateFn() {
    ctx.rotate(this.rotate)
  }
}

function dataSet() {
  step += 2

  let times = 0;
  if (window.innerWidth < 750) {
    times = Math.floor(Math.random() * 5 + 3)
  } else {
    times = Math.floor(Math.random() * 10 + 10)
  }

  for (let i = 0; i < times; i++) {
    dataArr.push(
      new Envelope(
        Math.random() * (ww - 100) + 100,
        Math.random() * (wh / 3),
        Math.random() * 360 + 1,
        imgArr[Math.floor(Math.random() * 2)]
      )
    )
  }
}
dataSet()

function draw() {
  // 插入图片
  ctx.clearRect(0, 0, ww, wh)
  dataArr.map((item) => {
    ctx.save()
    ctx.translate(item.x, item.y)
    item.move(item)
    item.rotateFn(item)

    if (window.innerWidth < 750) {
      let Width = item.pic.width / 2
      let Height = item.pic.height / 2
      ctx.drawImage(item.pic, 0, 0, Width, Height)
    } else {
      ctx.drawImage(item.pic, 0, 0)
    }

    ctx.restore()

  })
  window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)