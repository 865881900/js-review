/**
 * 解析url中的参数
 * @param url
 * @return {{param1: {}, param2: []}}
 */
function parseParam(url) {
  // 第一步用来获取?之后的字符串;
  const separateRegExp = /.+\?(.+)/;
  // 用来存储
  const s = separateRegExp.exec(url)[1];
  // 用来存储用&分隔的数组
  const propList = s.split('&');

  const separate1 = /(.+)=(.+)?/;
  const separate2 = /^\d+(\.{1}\d+)?$/;
  const paramFill = {};
  const paramNotFill = [];

  // 解析等号两边的值
  propList.forEach((item) => {
    // eslint-disable-next-line prefer-const
    let [, left, right] = separate1.exec(item);
    if (right !== undefined) {
      if (separate2.test(right)) {
        right = parseFloat(right);
      } else {
        switch (right) {
          case 'true':
          case 'false':
            right = right === 'true';
            break;
          case 'null':
            right = null;
            break;
          default:
            right = undefined;
        }
      }
      paramFill[left] = right;
    } else {
      paramNotFill.push(left);
    }
  });

  return {
    paramFill,
    paramNotFill,
  };
}

const param = parseParam('http:www.baidu.com?age=12&name=&a=1&b=false');
console.log(param);
