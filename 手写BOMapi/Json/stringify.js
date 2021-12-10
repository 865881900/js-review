// 实现 判断类型
function myTypeof(d) {
  // 因为null,undefined没有构造函数的
  // return o.constructor.name
  // -1 代表字符串的最大长度减一
  return Object.prototype.toString.call(d).slice(8, -1).toLowerCase();
}

Object.defineProperty(JSON, 'stringify', {
  value: function stringify(value) {
    const t = Array.isArray(value);
    let str = `${t ? '[' : '{'}`;
    Object.getOwnPropertyNames(value).forEach((k) => {
      const item = value[k];
      // eslint-disable-next-line no-prototype-builtins
      if (typeof item !== 'function' && value.hasOwnProperty(k) && item !== undefined) {
        if (t) {
          str += `${typeof item !== 'object' ? item.toString() : stringify(item)},`;
        } else if (myTypeof(item) === 'date') {
          str += `"${k}":"${item.toGMTString()}",`;
        } else if (myTypeof(item) === 'regexp') {
          str += `"${k}":"${item.toString()}",`;
        } else {
          // eslint-disable-next-line no-nested-ternary
          str += `"${k}":${typeof item !== 'object' ? item.toString() : item === null ? 'null' : stringify(item)},`;
        }
      }
    });
    str = str.slice(0, str.lastIndexOf(',')) + str.slice(str.lastIndexOf(',') + 1);
    return `${str}${t ? ']' : '}'}`;
  },
});
