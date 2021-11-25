/**
 * 解析url中的参数
 * @param url
 * @return {{param1: {}, param2: []}}
 */
function parseParam(url) {
    //第一步用来获取?之后的字符串;
    const separateRegExp = /.+\?(.+)/;
    // 用来存储
    const s = separateRegExp.exec(url)[1];
    // 用来存储用&分隔的数组
    const propList = s.split('&');

    const separate1 = /(.+)\=(.+)?/
    const separate2 = /^\d+(\.{1}\d+)?$/
    const param1 = {}
    const param2 = []

    // 解析等号两边的值
    propList.forEach(item => {
        let [, left, right] = separate1.exec(item)
        if (right !== undefined) {
            if (separate2.test(right)) {
                right = parseFloat(right)
            } else {
                switch (right) {
                    case 'true':
                    case 'false':
                        right = right === 'true';
                        break
                    case 'null':
                        right = null;
                        break
                    case 'undefined':
                        right = undefined;
                }
            }
            param1[left] = right;
        } else {
            param2.push(left)
        }
    })

    return {
        param1,
        param2
    }
}
