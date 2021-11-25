// 实现new操作符
/**
 * 第一个参数为构造函数,
 * 第二个之后,为这个构造函数的参数,
 *
 * 1: new 操作符返回一个对象,
 * 2: 该对象的__prop__属相指向, 构造函数的proptypes对象
 * 3: 该对象的构造函数 === 传递进来的构造函数
 * 4: 构造函数中的形参, 要赋值给创造的对象
 * @return {Object|*}
 */
function newObject() {
    // 创造一个对象
    const o = new Object();
    // 获取第一个参数,
    const Constructor = Array.prototype.shift.call(arguments);

    // 指定这个对象的_prop_为需要new 的构造函数的原型;
    o.__proto__ = Constructor.prototype;

    //apply 修改o的值;
    const res = Constructor.apply(o, arguments)

    // 判断传递进来的构造函数,是不是用return 返回的, 如果是,那么返回的对象为
    if (typeof res === 'object') {
        Object.defineProperty(res, 'constructor', {
            value: Constructor
        })
        return res
    } else {
        Object.defineProperty(o, 'constructor', {
            value: Constructor
        })
        return o
    }
}

// function A(name, age) {
//     this.name = name;
//     this.age = age;
// }
// A.prototype = {b: 12}
// const a = newObject(A, '王超朋', 18)
// console.log('a:', a.constructor === A);

/**
 * 用来模拟instanceof 操作符,
 * 用来判断right的原型链,是不是出现在left对象的原型链上;
 * 1:  两个对比都是对象
 * 2:
 * @param left 一个实例
 * @param right 一个构造函数
 */
function overrideInstanceof(left, right) {

    let p, lp, rp = right.prototype;

    // 获取left的构造函数的原型方法,
    while (lp = left.constructor.prototype) {
        if (lp === rp) {
            return true
        }
        if (lp === p) {
            break
        }
        p = lp
    }
    return false
}
