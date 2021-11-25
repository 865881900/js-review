// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'map1', {
  /**
   * 返回一个新数组, 以目标数组的每一个元素和其下标为参数,执行一个方法, 方法的返回值为新数组同样下标处元素的新值;
   * @param callback 需要执行的函数
   * @param thisArg 目标数组
   * @returns {*[]} 新的数组
   */
  value(callback, thisArg) {
    const list = this;
    // 声明一个新的数组
    const newList = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      newList[i] = callback.call(thisArg, list[i], i, list) || list[i];
    }
    return newList;
  },
});
