// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'some1', {
  /**
   *  方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
   * @param callback 测试函数
   * @param thisArg 被测试的数组
   * @returns {boolean} 是否通过测试
   */
  value(callback, thisArg) {
    const list = this;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      if (callback.call(thisArg, list[i], i, list) === true) {
        return true;
      }
    }
    return false;
  },
});
