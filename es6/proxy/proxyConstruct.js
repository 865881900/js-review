function A() {

}

const newA = new Proxy(A, {
  /**
   *
   * @param target 原对象
   * @param argArray 构造函数的数组
   * @param newTarget 返回的构造函数
   * @return {{}} 创造的对象
   */
  construct(target, argArray, newTarget) {
    console.log(target === A, argArray, newTarget === newA);
    return {};
  }
});

new newA(1, 2, 3);
