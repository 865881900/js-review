
/**
 * apply方法实现
 */
//ES6写法
function apply1(that, args) {
    that.fun = this;
    const data = that.fun(...args);
    delete that.fun;
    return data;
}
/**
 * 1. 有返回值
 * 2. 改变this指向
 * 3. 参数是数组
 * 4. 环境为ES5,无解钩
 * @param context 更改后,this指向
 */
function apply2(context, args) {
    const _this = this;
    const argsList = [];
    for (let i = 0; i < args.length; i++) {
        argsList.push('args[' + i + ']');
    }
    context._fun = _this;
    const data = eval('context._fun(' + argsList + ')');

    delete (context._fun);

    return data;

}
