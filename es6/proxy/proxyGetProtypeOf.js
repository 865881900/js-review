// 代理对象的返回对象原型方法

const obj = {
  name:'wcp',
  age:13
}

const obj2 = Object.create(obj);

const obj3 = new Proxy(obj2,{
  getPrototypeOf(target) {
    console.log('拦截',target);
    return {}
  }
})

Object.getPrototypeOf(obj3)

