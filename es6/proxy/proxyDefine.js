const obj = {
  name: 'wcp'
}

const pro = new Proxy(obj,{
  defineProperty(target, p, attributes) {
    console.log(target, p, attributes);
    return false
  }
})

Object.defineProperty(pro,'age',{
  value: 12
})

