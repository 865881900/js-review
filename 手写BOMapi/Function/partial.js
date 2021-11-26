/**
 * 函数偏移
 * 把函数的第一个参数放在缓存中,西祠调用一起使用
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'partial1', {
  /**
   * 偏移函数实现: ES6
   *  第一次传入一个函数,并不执行,返回一个偏移函数, 当执行偏移函数的时候, 执行该函数, 并且,在第一次传入的值在第二次使用
   * 分析:
   * 1. 接受一个函数, 和若干个参数,
   * 2. 返回一个函数,把第一次传入的参数化缓存在该函数的作用域下
   * 3: 当执行这个函数的时候, 把第一次缓存的函数和本次传入的函数用来做原函数的参数
   * @param fun 需要进行偏移的函数
   *
   */
  value(fun, ...args) {
    return (...arg) => {
      fun(...args, ...arg);
    };
  },
});
