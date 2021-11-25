/**
 * 一个拥有then函数的对象(function也是对象)
 */
class PromiseOverride {
    //等待状态
    get PENDING(){
        return 'pending'
    }
    //成功状态
    get PENDING(){
        return 'fulfilled'
    }
    //失败状态
    get PENDING(){
        return 'rejected'
    }

    //当前Promise对象的状态
    status = undefined

    //成功的回调
    onFulfilled = []
    //失败的回调
    onRejected = []


    // 成功的返回值(终值)
    value = undefined
    // 失败的返回值(据因)
    reason = undefined

    /**
     * 1. 当Promise对象在初始化的时候,修改状态为 PENDING,
     * 2. 并且立即执行构造函数传递过来的函数;
     * 3. 用try catch 来处理可能会出现的异常
     * @param executor
     */
    constructor(executor) {
        this.status = this.PENDING;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            this._reject(e)
        }
    }


    /**
     * 1. 如果当前对象的状态为等待中,才可以修改;
     * 2. 当认为成功后, 保存成功的返回值;
     * 3. 修改当前Promise的状态为成;
     * 4. 执行所有的成功回调函数;
     * @param value 成功值
     * @private
     */
    _resolve(value) {
        if (this.status === this.PENDING) {
            this.status = this.FULFILLED;
            this.value = value;
            this.onFulfilled.forEach(item => item());
        }
    }


    /**
     * 1. 如果当前对象的状态为等待中,才可以修改;
     * 2. 当认为失败后, 保存失败的返回值;
     * 3. 并且修改当前Promise的状态为失败;
     * 4. 并且执行所有的失败回调函数;
     * @param reason 失败值
     * @private
     */
    _reject(reason) {
        if (this.status === this.PENDING) {
            this.status = this.REJECTED;
            this.reason = reason;
            this.onRejected.forEach(item => item());
        }
    }


    /**
     * 1. then的返回值,有then函数,证明then函数返回的是一个promise对象;
     * 2. then的两个参数返回值, 如果是对象或者函数,且拥有then方法,那么该返回值的状态静影响到 then所属promise对象的状态
     * 3. 如果返回其他值,则为该对象的最终值
     * 4. 只有在promise的状态为等待的时候,才能改变状态
     * 5. onFulfilled/onRejected 给两个参数必须为函数
     * 6. then方法可以被一个promise对象多次调用(使用场景,缓存结果)
     * @param onFulfilled 当promise结束的时候调用,在结束前不可以调用, 调用次数不能超过一次,第一个参数为promise的终值
     * @param onRejected  当promise结束的时候调用,在结束前不能调用, 调用次数不能超过一次, 第一个参数为promise的据因
     * @return promise2 返回一个Promise对象
     * 如果onFulfilled/onRejected 抛出一个异常,promise2则必须终值,错误为据因;
     * 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值(必须指定默认值,为一个有一个参数的函数,没有返回值)
     * 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因(必须指定默认值,为一个有一个参数的函数,返回据因)
     */
    then(onFulfilled = () => {
    }, onRejected = err => {
        return err
    }) {
        // 当前对象
        const that = this;
        // 用来储存onFulfilled/onRejected的返回值
        let x, setTimeId;
        //then函数需要返回的promise对象
        const promise2 = new PromiseOverride((resolve2, reject2) => {
            // 这里为什么不用if, 因为if在执行的时候,需要办if所有的语句解析一遍, 在进行判断;
            // 而switch 在解析前,先去对比,在去解析满足条件的代码块;
            switch (that.status) {
                // 当前that状态为: 等待中
                case that.PENDING:
                    // 处于等待状态中,把回调添加到回调的数组中
                    that.onFulfilled.push(() => {
                        setTimeId = setTimeout(() => {
                            x = onFulfilled(that.value);
                            that._resolvePromise(promise2, x, resolve2, reject2)
                            clearTimeout(setTimeId)
                        })
                    })

                    that.onRejected.push(() => {
                        setTimeId = setTimeout(() => {
                            x = onRejected(that.status);
                            that._resolvePromise(promise2, x, resolve2, reject2)
                            clearTimeout(setTimeId)
                        })
                    })
                    break;
                // 当前that状态为: 成功
                case that.FULFILLED:
                    // 1: 立即then参数中的成功回调,并保存他的返回值;因为如果是方法或者Promise对象要做进一步的处理
                    setTimeId = setTimeout(() => {
                        x = onFulfilled(that.value);
                        that._resolvePromise(promise2, x, resolve2, reject2);
                        clearTimeout(setTimeId)
                    })
                    break;
                // 当前that状态为: 失败
                case that.REJECTED:
                    // 1: 立即then参数中的失败回调,并保存他的返回值;因为如果是方法或者Promise对象要做进一步的处理
                    setTimeId = setTimeout(() => {
                        x = onRejected(that.value);
                        that._resolvePromise(promise2, x, resolve2, reject2);
                        clearTimeout(setTimeId)
                    })
                    break;
            }
        });
        return promise2;
    }


    /**
     * 方法返回一个以给定值解析后的Promise 对象。如果这个值是一个 promise ，那么将返回这个 promise ；
     * 如果这个值是thenable（即带有"then" 方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
     * 否则返回的promise将以此值完成。
     * 此函数将类promise对象的多层嵌套展平。
     * @param value
     * @return {PromiseOverride}
     */
    static resolve(value) {
        if (value instanceof PromiseOverride) {
            return value
        }
        let then;
        const promise2 = new PromiseOverride((resolve, reject) => {
            if (typeof value === 'function' || typeof value === 'object') {
                try {
                    then = value.then;
                    if (typeof then === 'function') {
                        then.call(promise2, resolve, reject)
                    } else {
                        resolve(value)
                    }
                } catch (e) {
                    reject(e)
                }
            } else {
                resolve(value)
            }
        })
        return promise2
    }


    /**
     * 方法返回一个带有拒绝原因的Promise对象。
     * @param reason
     * @return {PromiseOverride}
     */
    static reject(reason) {
        return new PromiseOverride((resolve, reject) => {
            reject(reason)
        })
    }

    /**
     * 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例，
     * 那个输入的所有promise的resolve回调的结果是一个数组。
     * 这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，
     * 或者输入的iterable里没有promise了的时候。
     * 它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，
     * 并且reject的是第一个抛出的错误信息。
     * @param iterable
     */
    static all(iterable) {

    }

    /**
     * 刚开始还疑惑为什么这么写,知道看了Promise规范后..
     * 此处都是在参照规范写的, 如有不懂看查看规范
     * 规范: https://www.ituring.com.cn/article/66566#note-1
     *
     * 1. 如果x === promise2 则抛出一个typeError错误
     * 2. 如果x为promise,则使promise2接受x的状态
     *    如果x为等待状态,那么promise2一直为等待状态,直达x被执行或者拒绝
     *    如果x为执行,那么终值为promise2的终值
     *    如果x为拒绝,那么据因为promise2的据因
     * 3. 如果x为函数或者对象
     *     把x.then的值赋值给then
     *     如果赋值时抛出异常,那么为promise2的据因
     *     如果
     * @param promise2 在执行then需要返回的promise对象
     * @param x then中成功/失败的回调返回值
     * @param resolve2 then 需要返回的promise的成功回调
     * @param reject2 then 需要返回的promise的失败回调
     * @private
     */
    _resolvePromise(promise2, x, resolve2, reject2) {
        let used = false, that = this;
        // 如果promise2 和 x 相等, 那么相互引用
        if (promise2 === x) {
            throw '不能相互引用'
        }
        // 判断x的返回值是否为对象或者方法
        if (typeof x === 'function' || typeof x === 'object') {
            try {
                if (used) return
                const then = x.then;
                if (typeof then === 'function') {
                    then.call(promise2, (y) => {
                        if (used) return
                        that._resolvePromise(promise2, y, resolve2, reject2);
                        used = true
                    }, (r) => {
                        if (used) return
                        reject2(r)
                        used = true
                    })
                } else {
                    if (used) return
                    reject2(e);
                    used = true
                }
            } catch (e) {
                if (used) return
                reject2(e);
                used = true
            }
        } else {
            // 如果不是方法或者对象,不用做处理,直接返回到promise2到value上保存;
            resolve2(x)
        }
    }
}

// const promise1 = PromiseOverride.resolve(new PromiseOverride((resolve, reject) => {
//     resolve('hhh')
// }));
//
// promise1.then((value) => {
//     console.log(value);
//     // expected output: 123
// });


const promise = PromiseOverride.reject('据因')
