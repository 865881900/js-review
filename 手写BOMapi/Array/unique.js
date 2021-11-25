/**
 * 数组去重
 *
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'unique1', {
  /**
   * 第一种方案: 使用Set的不能重复的特性,把数组转为set后再转为数组
   * @returns {any[]}
   */
  value() {
    // return[...new Set(arr)]
    return Array.from(new Set(this));
  },
});

// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'unique1', {
  /**
   * 第二种方案, 遍历整个数组, 过滤掉元素第一次出现和他实际下标不等的元素
   * @returns {*}
   */
  value() {
    return this.filter((item, index, that) => that.indexOf(item) === index);
  },
});
