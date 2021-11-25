/**
 * 数组去重
 */
// 使用Array.includes 查找属性时,总会返回第一个找到的值的下标;
Array.prototype.unique1 = function () {
    return this.filter((item, index, that) => {
        return that.indexOf(item) === index
    })
}
// 使用set数据结构的特性,唯一性来转化数组;
Array.prototype.unique2 = function () {
    // return[...new Set(arr)]
    return Array.from(new Set(this))
}
