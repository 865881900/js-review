// var a = '这是顶级作用域'
// function fun1() {
//     console.log(a,c)
// }
// function fun2() {
//     var a = '这是fun2作用域';
//     var c = 13;
//     fun1();
// };
//
// fun2();

// function fun1(arge = '这是参数'){
//     console.log(arge);
//     var arge = '声明'
//     function arge(){
//         console.log('这是函数')
//     }
//     console.log(arge)
//     var arge = ()=>{}
// }
// fun1()

function fun(...arg) {
  console.log(Object.prototype.toString.call(arg));
  console.log(arguments.constructor.name);
}

fun();
