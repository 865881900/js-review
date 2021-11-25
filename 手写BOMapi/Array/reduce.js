// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'reduce1', {
  /**
   * 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
   * @param callback
   * @param initialValue
   * @returns {string|*}
   */
  value(callback, initialValue) {
    let value = initialValue;
    const list = this;
    let i = 0;
    if (!Array.isArray(list)) {
      return '不是数组';
    }
    // 如果没有传递第二个参数,那么默认为数组的第一个元素
    if (value === undefined) {
      // eslint-disable-next-line prefer-destructuring
      value = list[0];
      i += 1;
    }
    // eslint-disable-next-line no-plusplus
    for (let j = i; j < list.length; j++) {
      console.log('遍历');
      value = callback(value, list[i], j, list);
    }
    return value;
  },
});

// 测试
const arr = [1, 2, 3, 4, 5];
const value = arr.reduce1((i, j) => i + j);
console.log(value);
