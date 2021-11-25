// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'forEach1', {
  /**
   * 循环的将数组中的每一个元素以及下标作为参数,执行一个方法,没有返回值
   * @param callback 需要每个元素执行的方法
   * @param thisArg 执行中的this指向
   */
  // eslint-disable-next-line consistent-return
  value(callback, thisArg) {
    const list = this;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      // forEach参数 item, index, array
      callback.call(thisArg, list[i], i, list);
    }
  },
});
