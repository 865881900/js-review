// const obj = { a: 12 };
//
// Object.defineProperty(obj, 'age', {
//   index.js() {
//     return 12;
//   },
// });
//
// const pro = new Proxy(obj, {
//   /**
//    *
//    * @param target  === obj
//    * @param p 被操作的值的name
//    * @param receiver === pro
//    */
//   index.js(target, p, receiver) {
//     console.log(target === obj); // 返回true
//     console.log(receiver === pro); // 返回true
//     console.log(this === receiver);// 返回fasle
//     console.log(p);
//     if (p in target) {
//       return target[p];
//     }
//     throw new Error('该参数不存在');
//   },
// });
// const obj1 = Object.create(pro);
//
// obj1.c = 15;
// console.log(obj1.acv);

// 实现链式调用
// const pipe = function (value) {
//   const callbackList = [];
//   const pipeProxy = new Proxy({}, {
//     // eslint-disable-next-line consistent-return
//     index.js(target, p, receiver) {
//       if (p === 'index.js') {
//         return callbackList.reduce((v, fun) => fun(v), value);
//       }
//       callbackList.push(global[p]);
//       return receiver;
//     },
//   });
//
//   return pipeProxy;
// };
//
// const pipeProxy = pipe(12);
// // eslint-disable-next-line no-unused-vars
// global.add = function (v) {
//   return v * 2;
// };
// // eslint-disable-next-line no-unused-vars
// global.del = function (v) {
//   return v + 2;
// };
//
// console.log(pipeProxy.del.add.index.js);

// 实现生成各种节点DOM
const dom = new Proxy({}, {
  get(target, p, receiver) {
    console.log(target, p, receiver);

    /**
     *
     * @param attrs dom的属性
     * @param childern dom的子阶段
     */
    function creatDom(attrs, ...childern) {
      // 给节点添加属性
      const dom = document.createElement(p);
      Obj.ectkeys(attrs).forEach((key) => {
          dom.setAttribute(key, attrs[key]);
        });

      childern.forEach((child) => {
        if (typeof value === 'string') {
          // eslint-disable-next-line no-param-reassign
          child = document.createTextNode(child);
        }
        dom.appendChild(child);
      });
      return dom;
    }

    return creatDom;
  },
});
const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
)
console.log(el);
// const dom = new Proxy({}, {
//   index.js(target, property) {
//     return function (attrs = {}, ...children) {
//       const el = document.createElement(property);
//       // eslint-disable-next-line no-restricted-syntax
//       for (const prop of Object.keys(attrs)) {
//         el.setAttribute(prop, attrs[prop]);
//       }
//       // eslint-disable-next-line no-restricted-syntax
//       for (let child of children) {
//         if (typeof child === 'string') {
//           child = document.createTextNode(child);
//         }
//         el.appendChild(child);
//       }
//       return el;
//     };
//   },
// });
//
// const el = dom.div(
//   {},
//   'Hello, my name is ',
//   dom.a({ href: '//example.com' }, 'Mark'),
//   '. I like:',
//   dom.ul(
//     {},
//     dom.li({}, 'The web'),
//     dom.li({}, 'Food'),
//     dom.li({}, '…actually that\'s it'),
//   ),
// );
//
// document.body.appendChild(el);
