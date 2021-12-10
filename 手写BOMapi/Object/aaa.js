function Animal (name,sound) {
  this.name = name
  this.sound = sound
}
Animal.prototype.shout = function () {
  console.log('原来的原型上的方法')
}

// 定义Plants
function Plants (name) {
  this.name = name
  this.sound = null
}
// 函数接收参数用于区分
Plants.prototype.shout = function () {
  console.log('替换后的方法1')
}
Plants.prototype.genO2 = function () {
  console.log('替换后的方法1')
}



// Animal.prototype = Object.create(Plants.prototype)
// let cat = new Animal('mimi','miao~miao~')
// cat.shout() // mimi miao~miao~ plants tag

//


// let cat = new Animal('mimi','miao~miao~')
// Object.setPrototypeOf(cat,Plants.prototype)
// cat.shout() // mimi miao~miao~ plants tag

// cat.shout() // mimi miao~miao~
