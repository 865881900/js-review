
/**
 * 考虑全部类型的深copy
 * 实现思路:
 * 永原对象的target作为判断他们的依据
 *
 * 基本类型:
 * number 直接返回
 * undefined 直接返回
 * null 直接返回
 * boolean 直接返回
 * Symbol 获取他的name,重新创造一个
 * string 直接返回
 * 引用类型:
 * data 重新new 一个
 * regexp 重新new一个
 * function 用bin执行一个
 * @param target
 * @param map
 */
class DeepCopy {
    targetMap = new WeakMap();
    // 值赋值的类型
    static NOT_COPY_TYPE = ['number', 'undefined', 'null', 'boolean', 'string'];
    // 需要通过new来copy的类型
    static NEW_COPY = ['data', 'regexp'];
    copyObject = undefined

    copy(o){
        const that = this, {targetMap} = that
        that.copyObject = this._main(o);
        Array.from.call(targetMap).filter(([, item]) => item.length > 1).forEach((_, [one, two]) => {
            const oneList = one.split(',');
            const twoList = two.split(',');
            this._setValueByTarget(this._getValueToTarget(oneList),twoList)
        })
    }

    _main(object, that, target = 'object') {
        const type = this._myTypeof();
        if (type === 'object' || type === 'array') {
            this._getTargetList(object, target)
            if (this._hasTargetListTwo(object)) {
                return '等待装载'
            }
        }
        if (DeepCopy.NOT_COPY_TYPE.includes(type)) {
            return object
        } else if (DeepCopy.NEW_COPY.includes(type)) {
            return new object.constructor(object)
        } else if (type === 'function') {
            return object
        } else {
            const o = type === 'object' ? {} : []
            for (let k in object) {
                o[k] = this._main(object[k], object, `${target},${k}`)
            }
            return o
        }
    }


    /**
     * 返回类型
     * @param o
     * @return {string}
     * @private
     */
    _myTypeof(o) {
        // 因为null,undefined没有构造函数的
        // return o.constructor.name
        //-1 代表字符串的最大长度减一
        return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
    }


    /**
     * 判断map中是否有object的key,没有的添加一个只有target数组,有的话把target添加到数组中去
     * @param object
     * @param target
     */
    _getTargetList(object, target) {
        const {targetMap} = this;
        if (targetMap.has(object)) {
            targetMap.get(object).push(target)
        } else {
            targetMap.set(object, [target])
        }
    }


    /**
     * 返回map中key为object的值的长度是不是等于二
     * @param object
     * @return {boolean}
     */
    _hasTargetListTwo(object) {
        return this.targetMap.get(object).length === 2
    }

    //取出重复引用的值
    _getValueToTarget(targetList) {
        const {copyObject} = this;
        let o = copyObject;
        if (targetList.length === 1) {
            o = copyObject;
        }else{
            targetList = targetList.slice(1)
        }

        targetList.forEach(item => {
            o = o[item]
        })
        return o
    }

    // 给重复引用的值,重新赋值
    _setValueByTarget(o,targetList){
        const {copyObject} = this;
        let b = copyObject;
        let targetName = targetList.pop();
        targetList.forEach(item => {
            b = o[item]
        })
        b[targetName] = o
    }
}
