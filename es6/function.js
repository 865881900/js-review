// function foo() {
//   const a = () => {
//     console.log(this.name);
//   };
//   a();
// }
// name = 12;
//
// // 打印的是12
// foo();
// // 打印的是123
// foo.call({ name: 123 });
// function fun1() {
//   return () => {
//     console.log(this.a);
//   };
// }
//
// const fun2 = fun1.call({a:'这是劫持'});
// var a = '12';
//
// fun2();
/**
 * 计算x累计增加的值的和
 * @param x 原始值
 * @param y 累加次数
 */
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x += 1, y - 1);
  } else {
    return x;
  }
}

/**
 * 使用蹦床函数实现递归优化
 * @param f
 * @return {*}
 */
function trampoline(f) {
  while (typeof f === "function" && f) {
    f = f();
  }
  return f;
}

/**
 *
 * @param f
 * @return {(function(): (*|undefined))|*}
 */
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}


sum(1, 100000)
