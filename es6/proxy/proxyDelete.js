const obj = {age:12}
Object.defineProperty(obj,'name',{
  value: 'wcp',
  configurable:false,
  writable:false,
  enumerable:false
})


// Object.preventExtensions(obj)

const pro = new Proxy(obj, {
  deleteProperty(target, p) {
    console.log(target, p);

    delete target[p]
    return false
  }
});

console.log(pro.name);
delete pro.name;
console.log(pro.name);

// delete pro.age;
// console.log(pro.age);
