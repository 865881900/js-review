/**
 *
 * @param str  需要渲染的字符传
 * @param data 渲染对象
 */

const i = 0;
function stringTemplate(str, data) {
  let s = str;
  const templateRE = /\{\{(\w)\}\}/;
  const legalRE = /^(_|[a-zA-Z])/;
  let REData = templateRE.exec(s);
  // eslint-disable-next-line no-cond-assign
  while (REData && i < 2) {
    if (!legalRE.test(REData[1])) {
      console.log(REData[1], '非法');
      break;
    }
    s = s.replace(templateRE, data[REData[1]]);
    console.log(i, s);
    REData = templateRE.exec(s);
  }
  return s;
}

// 测试
let str = '今天是{{y}}年{{m}}月{{d}}日';
str = stringTemplate(str, {
  y: 2010,
  m: 1,
  d: 2,
});
console.log('完成', str);
