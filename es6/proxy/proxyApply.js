const o1 = {
  name:12,
  getName(){
    return this.name
  }
};
const o2 = {
  name:13
}

const por = new Proxy(o1.getName,{
  /**
   *
   * @param target 原对象
   * @param thisArg 需要替换的对象
   * @param argArray 传递的参数
   */
  apply(target, thisArg, argArray) {
    console.log(target, thisArg, argArray);
    return target.call(thisArg)
  }
})

console.log(por.apply(o2, [12]));
