/**
 * 数组扁平化
 * 思路: 利用concat函数中,参数如果是数组,会分分解成单个值, 在进行合并的特性,
 * @param arr 被执行数组
 * @returns {*} 过滤后的数组
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'flat1', {
  value(arr) {
    let brr = arr;
    while (brr.some((item) => Array.isArray(item))) {
      brr = [].concat(...brr);
    }
    return brr;
  },
});

// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'flat2', {
  /**
   * 数组扁平化2
   * 思路: 利用
   * @param 数组的reduce方法, 逐个对元素进行遍历, 如果元素是数组,再次对元素进行遍历,也是使用concat的特性,进行合并的;
   * @returns {*}
   */
  value(arr) {
    const brr = arr;
    // eslint-disable-next-line no-caller,no-restricted-properties,max-len
    return brr.reduce((res, next) => res.concat(Array.isArray(next) ? arguments.callee(next) : next), []);
  },
});
