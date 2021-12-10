/**
 * 实现object.assign:方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
 * @param target
 * @return {*}
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Object.prototype, 'assign1', {
  value(target, ...args) {
    // 判断是否为对象并且不能为null
    if (typeof target !== 'object' || target === null) {
      throw new TypeError('target 必须为对象并不能为null');
    }
    // 如果为null,
    const d = target;
    // 遍历剩余参数
    args.forEach((item) => {
      // 获取可枚举的属相数组
      Object.keys(item).forEach((k) => {
        // 赋值给源数组
        d[k] = item[k];
      });
    });

    return d;
  },
});

const a = { a: 1 };
const b = { b: 2 };
const c = { b: 3 };
const d = { a: 4 };

const e = Object.assign1(a, b, c, d);
console.log(e);
