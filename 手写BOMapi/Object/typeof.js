// 实现 判断类型
Object.defineProperty(Object.prototype, 'myTypeof', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function () {
        // 因为null,undefined没有构造函数的
        // return o.constructor.name
        //-1 代表字符串的最大长度减一
        return Object.prototype.toString.call(this).slice(8, -1).toLowerCase()
    }
})
