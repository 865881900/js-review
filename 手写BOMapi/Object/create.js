/**
 * 实现object.creat函数
 * @param prop
 * @param propertiesObject
 * @return {O}
 */
Object.prototype.create1 = function (prop, propertiesObject) {
    if (typeof prop !== 'function' && typeof prop !== 'object') {
        throw 'prop参数必须为对象或者函数'
    }
    if (typeof propertiesObject !== 'object') {
        throw 'propertiesObject参数必须为对象'
    }

    function O() {
    }

    O.prototype = prop;
    const o = new O()
    // o.
    if (propertiesObject !== undefined) {
        try {
            Object.defineProperties(o, propertiesObject)
        } catch (e) {
            for (let key in propertiesObject) {
                if (Object.hasOwnProperty(key)) {
                    o[key] = propertiesObject[k]
                }
            }
        }
    }
    if (prop === null) {
        o.__prop__ = null
    }
    return o

}
