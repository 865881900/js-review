// if (false) {
//   // eslint-disable-next-line no-unused-vars,no-inner-declarations
//   function af() {
//     console.log('这是af');
//   }
// }
// // eslint-disable-next-line no-undef
// // af();
//
//

// // var a = 12;
// function fun() {
//   var a = 12;
// }
// fun(); //undefined
// console.log(a);

function fun() {
  console.log(fun1)
  fun1(); // 此时的fun1并不是函数
  if(false){
    function fun1() { // === var fun1 提升到fun的作用域下

    }
  }
}
fun()