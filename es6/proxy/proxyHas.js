const obj = {
  name:'wcp',
  _age:12
}

Object.preventExtensions(obj)

// 实现判断是否_开头,返回false
const p = new Proxy(obj,{
  has(target, p) {
      if(p.startsWith('_')){
        return false
      }
      return p in target
  }
})
console.log("_age" in p);
console.log("name" in p);
