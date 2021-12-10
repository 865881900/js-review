const obj = new Object();
Object.defineProperty(obj,'name',{
  value:'wcp',
  configurable:true
})

// try{
//   Object.defineProperty(obj,'name',{
//     value:'hll'
//   })
// }catch (e) {
//   console.log(e.message,'出错了');
// }
//
// console.log(Reflect.defineProperty(obj, "name", {
//   value: "hll"
// }));

console.log("name" in obj);
console.log(Reflect.has(obj,'name'))
