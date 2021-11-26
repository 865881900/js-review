/**
 * call方法实现
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'call1', {
  /**
   * 实现Function 中的call方法,Es6语法
   * 1: call函数的参数不是数组
   * 2: 改变当前函数的this指向
   * 3: 返回该函数的结果
   * 4: 和apply函数类似, 只是传参的方式不一样
   * @param context
   */
  value(context, ...args) {
    // 此时的that为当前函数;
    const that = this;
    const funName = Symbol('funName');
    context[funName] = that;
    const returnData = context[funName](...args);
    delete context[funName];
    return returnData;
  },
});

// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'call2', {
  /**
   * 实现Function 中的call方法,Es5语法
   * 1: call函数的参数不是数组
   * 2: 改变当前函数的this指向
   * 3: 返回该函数的结果
   * 4: 和apply函数类似, 只是传参的方式不一样
   * @param context
   */
  value(context) {
    // 此时的that为当前函数;
    const that = this;
    const funName = Symbol('funName');
    const args = [];
    for (let i = 1; i < arguments.length; i += 1) {
      args.push(`arguments[${i}]`);
    }
    context[funName] = that;
    const returnData = avle('context[funName]('+args+')');
    delete context[funName];
    return returnData;
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

// 测试a
a.getName.call1(b, '这是参数1', '这是参数2');
// 测试2
a.getName.call1(b, '这是参数1', '这是参数2');
