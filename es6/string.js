/**
 * 解析template为html文件;
 * 实现思路, 转换为表达式字符串
 *  echo('<ul>')
 *    for(let i=0; i < data.supplies.length; i++) {
 *      echo('<li>')
 *      echo(data.supplies[i])
 *      echo('</li>')
 *    }
 * echo('</ul>')
 */

// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;
// function fun(t){
//   const reg1 = /<%(.+?)%>/g
//   const reg2 = /<%=([\s\S]+?)%>/g
//   const template = 'echo(`' + t.replace(reg2,'`); echo($1); echo(`').replace(reg1,'`); $1 echo(`') + '`)';
//   const script = `(function f(data) {
//     let output = ''
//     function echo(html){
//       output += html
//     }
//     ${template}
//     return  output
//   })`
//   return script
// }
//
// const f1 = eval(fun(template));
//
// console.log(f1({
//   supplies: ["年", "月", "日"]
// }));

// function fun1(a, b) {
//   console.log(a);
//   console.log(b);
// }
//
// // eslint-disable-next-line no-unused-expressions
// fun1`你好${'这是第二个参数'}2${'这是第三个参数'}3`;

// tag`First line\nSecond line`;

// function tag(strings) {
//   console.log(strings.raw[0]);
//   strings.raw[0] 为 "First line\\nSecond line"
//   打印输出 "First line\nSecond line"
// }

const str = '123457';
// 返回字符串是否被目标字符串包含
console.log(str.includes('12'));
// 返回字符串是否为目标字符串的开头
console.log(str.startsWith('123'));
// 返回字符串是否为目标字符串的结尾
console.log(str.endsWith('457'));
// 把目标字符串重复指定次数
console.log(str.repeat(2));
// 返回字符串制定下标的字符 str[1]
console.log(str.at(1));
