// 实现 判断类型
function myTypeof(d) {
    // 因为null,undefined没有构造函数的
    // return o.constructor.name
    //-1 代表字符串的最大长度减一
    return Object.prototype.toString.call(d).slice(8, -1).toLowerCase()
}

function stringify(value) {
    const _stringify = function (value) {
        const t = Array.isArray(value)
        let str = `${t ? '[' : '{'}`
        for (let k in value) {
            const item = value[k]
            if (typeof item !== 'function' && value.hasOwnProperty(k) && item !== undefined) {
                if(t){
                    str += `${typeof item !== 'object' ? item.toString() : _stringify(item)},`
                }else if(myTypeof(item) === 'date'){
                    str += `"${k}":"${item.toGMTString()}",`
                }else if(myTypeof(item)  === 'regexp'){
                    str += `"${k}":"${item.toString()}",`
                }else{
                    str += `"${k}":${typeof item !== 'object' ? item.toString() : item === null? 'null':_stringify(item)},`
                }

            }
        }

        str = str.slice(0, str.lastIndexOf(',')) + str.slice(str.lastIndexOf(',') + 1)
        return str + `${t ? ']' : '}'}`
    }
    return _stringify(value)
}

a = {a: 12, b: {c: 13},d:[1,2,3,4],e:undefined,f:null,g:new Date(),h:new RegExp(/[121]/g),i:Symbol('nihao')}

console.log(stringify(a));
console.log(JSON.stringify(a));
