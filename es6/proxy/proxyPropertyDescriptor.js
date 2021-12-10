// 拦截返回对象的属性描述
const obj = {};
Object.defineProperty(obj,'name',{
  value:'wcp',
  configurable:false,
  writable:true
})

const pro = new Proxy(obj,{
  getOwnPropertyDescriptor(target, p) {
    console.log(target,p);
  }
})

Object.getOwnPropertyDescriptor(pro,'name')
