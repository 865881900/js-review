/**
 * 函数偏移
 * 把函数的第一个参数放在缓存中,西祠调用一起使用
 */
function partial(fun, ...arg) {
    return (...args) => {
        return fun(...arg, ...args)
    }
}
