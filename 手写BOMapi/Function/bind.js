
/**
 * bind方法实现
 */
function bind1(that, ...arg) {
    const _this = this;
    const fNOP = function () {

    };
    function fun(...args) {
        console.log('执行', _this)
        return _this.call(that, ...[...arg, ...args])
    }
    fNOP.prototype = this.prototype
    fun.prototype = new fNOP();
    return fun
}
function bind2(context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {
    };

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
