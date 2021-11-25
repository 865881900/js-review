/**
 * 注意: 此时的数组长度不一定和原数组一致
 * @param callback 过滤条件函数, 返回值为boolean
 * @param thisArg 目标数组
 * @returns {string|*[]} 返回过滤后的数组
 */

// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'filter1', {
  value(callback, thisArg) {
    const list = this;
    const newList = [];
    // 判断是否为数组, 不是数组,抛出typeError异常
    if (!Array.isArray(list)) {
      return '不是数组';
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      // eslint-disable-next-line no-unused-expressions
      (callback.call(thisArg, list[i], i, list) === true) && (newList.push(list[i]));
    }
    return newList;
  },
});
