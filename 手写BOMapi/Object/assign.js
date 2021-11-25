/**
 * 实现object.assign函数
 * @param target
 * @return {*}
 */
Object.prototype.assign1 = function(target) {
    //判断是否为对象
    if (typeof target !== 'object') {
        throw  'target 必须为对象'
    }
    const sources = Array.prototype.splice.call(arguments, 1)
    sources.forEach(item => {
        for (const itemKey in item) {
            if (item.hasOwnProperty(itemKey)) {
                target[itemKey] = item[itemKey]
            }
        }
    })
    return target
}
