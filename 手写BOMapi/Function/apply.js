// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'apply1', {
  /**
   * 实现function中的apply函数 Es6写法
   * 分析:
   * 1: apply中的一个参数为this指向参数
   * 2: 第二个参数为一个数组,
   * 3: 其主要的目的是,改变当前函数的this指向
   * 4: 执行该函数
   * 5: 返回函数的执行结果
   * 6: 当函数执行完后,删除该对象上的函数指针
   * 7: 参数2为一个数组
   * this指向是发生在执行期间的,也就是和说,在没执行函数之前,this指向是不确定的
   * 那么我们把这个函数复制一份,放在指定的对象上,并用对象.这个函数
   * @param context 需要设置函执行期数this的对象
   * @param args 函数参数
   * @return Any 返回函数执行结果
   */
  value(context, args) {
    // 此时的this为函数本身,函数也是Objec的派生类,
    const fun = this;
    // 声明一个Symbol类型,表示不能被重复, 不会冲掉对象原有的方法;
    // const funName = Symbol('fun');
    const funName = 'funName';
    // 把函数赋值为该对象的函数
    context[funName] = fun;
    // 执行函数,并拿到返回结果
    const returnData = context[funName](args[0], args[1]);
    //  删除这个属相
    delete context[funName];
    // 返回函数执行结果
    return returnData;
  },
});

// eslint-disable-next-line no-extend-native
Object.defineProperty(Function.prototype, 'apply2', {
  /**
   * 在Es5 环境中,实现apply方法
   * 分析:
   *  1: 和apply1相同
   *  2: 此时不能使用结构语法,此时需要借用eval函数.但是这个可能会有安全漏洞
   * @param context 需要设置函执行期数this的对象
   * @param args 函数参数
   * @return Any 返回函数执行结果
   */
  value(context) {
    const that = this;
    const argsList = [];
    const funName = Symbol('funName');
    // eslint-disable-next-line no-plusplus,prefer-rest-params
    for (let i = 0; i < arguments[1].length; i++) {
      argsList.push(`arguments[1][${i}]`);
    }
    context[funName] = that;
    // eslint-disable-line
    const data = eval(`context[funName](${argsList})`);
    delete context[funName];
    return data;
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
a.getName.apply1(b, ['这是参数1', '这是参数2']);
// 测试2
// a.getName.apply2(b, ['这是参数1', '这是参数2']);
