/**
 * call方法实现
 */
// ES6写法
function call1(that, ...args) {
    const _this = this;
    that.fun = _this;
    that.fun(...args);
    delete that.fun
}
/**
 * 1. 有返回值
 * 2. 改变this指向
 * 3. 参数不是数组
 * 4. 环境为ES5,无解钩
 * @param context 更改后,this指向
 */
function call2(context) {
    const _this = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        // 为什么用这种法式, 因为在调用aggs的toString方法的时候, 如果参数是Object,没有冲洗toString方法就会报错
        args.push('arguments[' + i + ']')
    }

    Object.defineProperty(context, '_fun', {
        configurable: true,
        value: _this
    })

    // eval 函数在调用的时候,字符串arguments[0], 会填入其对应的具体的值;
    const data = eval('context._fun(' + args + ')')
    delete context._fun
    return data
}
