// function aFun() {
//   const a = 12;
//   console.log(a);
// }
// function bFun() {
//   const b = 13;
//   console.log(b);
//   aFun();
// }
// bFun();

// 当代码运行的时候,回创建一个运行栈;
// 栈的最里面是全局运行环境;其中声明两个变量,aFun和bFun都指向一个函数对象,存放在堆中;
// 当执行到bFun的时候,会创建一个bFun的函数上下文,并压入栈中; 声明一个b的变量,指向一个13的变量;
// 当执行到aFun函数的时候,会在创建一个函数上下文;并创建a变量;
// 执行aFun的console函数, 执行完毕后, aFun的上下文出栈
// 等到aFun执行完毕后, 中兴bFun的console函数, 执行完毕后,bFun出栈
// 此时运行栈中只剩一个全局上下文

const p = new Promise((resolve) => {
  console.log('执行Promise');
  resolve('');
});
const sITd = setTimeout(() => {
  console.log('这是setTimeout');
  clearTimeout(sITd);
}, 0);
const sIId = setInterval(() => {
  console.log('这是setInterval');
  clearInterval(sIId);
}, 0);
p.then((d) => {
  console.log('执行then', d);
});
console.log('本次结束');

// 在上面的代码中, Promise和setTime被称为任务源, js会把不同任务源发布的任务,添加到不容的任务队列中去;
