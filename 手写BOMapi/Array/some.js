function some1(callback, thisArg) {
    const list = this, isSome = false;
    if (!Array.isArray(list)) {
        return '不是数组'
    }
    for (let i = 0; i < list.length; i++) {
        if (callback.call(thisArg, list[i], i, list) === true) {
            return true
        }
    }
    return false
}
