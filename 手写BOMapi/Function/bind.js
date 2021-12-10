/**
 * bind方法实现
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'bind1', {
  /**
   * 实现Function的bind函数,ES6语法
   * 1: 改变this指向
   * 2: 不执行函数
   * 3: 如果bind有其他参数没保存起来,等到函数调用的时候,当做函数的参数调用
   * 4: 返回一个函数
   * @param context
   * @return Function
   */
  value(context, ...args) {
    const that = this;
    return function (...arg) {
      return that.apply(context, args.concat(...arg));
    };
  },
});

/**
 * bind方法实现
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'bind2', {
  /**
   * 实现Function的bind函数,ES6语法
   * 1: 改变this指向
   * 2: 不执行函数
   * 3: 如果bind有其他参数没保存起来,等到函数调用的时候,当做函数的参数调用
   * 4: 返回一个函数
   * @param context
   * @return Function
   */
  value(context) {
    const that = this;
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.splice(arguments, 1);

    return function () {
      for (let i = 0; i < arguments.length; i += 1) {
        // eslint-disable-next-line prefer-rest-params
        args.push(arguments[i]);
      }
      return that.apply(context, args);
    };
  },
});

const a = {
  name: '这是a的name',
  getName(arg1, arg2) {
    console.log(arg1, arg2, this.name);
    return this.name;
  },
};
const b = {
  name: '这是b的name',
};

// 测试1
const f1 = a.getName.bind1(b, 1);
f1(2, 3, 4);

// // 测试2
// const f2 = a.getName.bind2(b);
// f2(1, 2, 3, 4);
