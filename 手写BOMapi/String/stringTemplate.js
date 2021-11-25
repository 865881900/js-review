/**
 *
 * @param str  需要渲染的字符传
 * @param data 渲染对象
 */
function stringTemplate(str, data) {
    let templateRE = /\{\{(\w)\}\}/;
    let legalRE = /^(_|$|[a-zA-Z])/;
    let REData;
    while (REData = templateRE.exec(str)) {
        if (legalRE.test(REData[1])) {
            console.log(REData[1],'非法')
            break
        }
        str = str.replace(templateRE, data[REData[1]])
    }
    return str;
}

//测试
let src = '今天是{{y}}年{{m}}月{{22}}日';
str = stringTemplate(src, {
    y: 2010,
    m: 1,
    d: 2
})
console.log('完成', str);
