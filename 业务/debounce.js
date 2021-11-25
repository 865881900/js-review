/**
 * 防抖: 在规定时间内,不能发生两次事件, 如果在未到达规定时间内再次触发,那么从新开始计数;
 * @param fun 需要防抖处理的函数
 * @param time 规定时间
 * @returns {(function(*=, ...[*]=): void)|*}
 */
function debounce(fun, time = 300) {
  // 生命一个id,用来保存timeOut的id, 用过之后关闭,防止内存泄漏
  let setTimeoutId;
  // 返回一个函数
  return function (that, ...arg) {
    // 判断是否已经有延时执行代码,有的话关闭延时执行代码;
    // eslint-disable-next-line no-unused-expressions
    setTimeoutId && clearTimeout(setTimeoutId);
    // 声明一个延时执行代码,在规定时间后,执行该代码
    setTimeoutId = setTimeout(() => {
      try {
        fun.call(that, arg);
      } catch (e) {
        // 如果出现异常, 关闭演示执行代码, 防止内存泄漏
        clearTimeout(setTimeoutId);
        setTimeoutId = undefined;
      }
    }, time);
  };
}

/**
 * 节流: 在规定时间内只能发生一次,过了规定时间后可再次触发和防抖函数差不多;
 * @param fun 需要节流处理的函数
 * @param time 规定时间
 * @returns {(function(...[*]): void)|*}
 */
function throttle(fun, time = 300) {
  // 用来判断是否可以被执行
  let isPerform = true;
  // 关闭timeOut
  let setTimeId;
  return (...args) => {
    // 判断不可执行,返回
    if (!isPerform) {
      return;
    }
    // 代码已经被执行, 在规定时间内不可再次执行
    isPerform = false;
    try {
      // 执行该函数
      fun(...args);
      setTimeId = setTimeout(() => {
        // 规定时间到后,代码可以再次执行
        isPerform = true;
        clearTimeout(setTimeId);
      }, time);
    } catch (e) {
      // 防止出现异常,导致内存泄漏
      setTimeId = setTimeout(() => {
        isPerform = true;
        clearTimeout(setTimeId);
      }, time);
    }
  };
}

// 测试代码
debounce(() => {
});
throttle(() => {
});

/**
 * 思路: 用闭包,来记录每次每个参数,当参记录参数不小于实际参数时,执行原函数
 * 对多个参数的函数进行柯力化
 * @param fun 原函数: 需要被柯力化的函数
 * @returns {(function(...[*]): (*))|*}
 */
function curry2(fun) {
  const current = function (...args) {
    // 判断当前记录的参数数量是否大于或者等于原函数的形参数,true,则用记录的参数执行原函数
    if (args.length >= fun.length) {
      return fun(...args);
    }
    // 如果小于原函数的形参数量,则继续记录
    return (...arg) => current(...args, ...arg);
  };
  return current;
}
// 测试
const testCurry2 = function (a, b, c, d) {
  console.log(a, b, c, d);
};
const testCurry2Ok = curry2(testCurry2);
testCurry2Ok(1, 2)(2)(3, 12, 31);

/**
 * 和curry2类似,不用显示的储存参数, 保存在argument对象里面
 * @param fun
 * @returns {(function(...[*]): (*))|*}
 */
// 柯力化2
function curry1(fun) {
  const args = [];
  const { length } = fun;
  return function _curry(...arg) {
    args.push(...arg);
    if (args.length >= length) {
      return fun(...args);
    }
    return _curry;
  };
}
// 测试
const testCurry1 = function (a, b, c, d) {
  console.log(a, b, c, d);
};
const testCurry1Ok = curry1(testCurry1);
testCurry1Ok(1, 2)(2);
