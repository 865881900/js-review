const obj = Object.defineProperty({}, "name", {
  value: "wcp",
  configurable: false
});
const proxySet = new Proxy(obj, {
  /**
   *
   * @param target 源对象
   * @param p 修改的属性的名称
   * @param value 需要为该为的值
   * @param receiver 返回的proxy对象
   */
  set(target, p, value, receiver) {
    if (p.at(0) === "_") {
      throw new Error("内部属性不能修改");
    }
    if (p === "age" && value > 200) {
      throw new Error("age属性不能大于200");
    }
    target[p] = value;
  }

});

proxySet.age = 120;
proxySet.name = "wcp1";
console.log(proxySet.name);
// proxySet._name = 'wcp'
console.log(proxySet);


