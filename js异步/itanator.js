// function* idMaker() {
//   let index = 0;
//   while (true) {
//     // eslint-disable-next-line no-plusplus
//     yield index++;
//   }
// }
// const gen = idMaker();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
//
// function makeIterator(array) {
//   let index = 0;
//   return {
//     next() {
//       return {
//         // eslint-disable-next-line no-plusplus
//         value: array[index++],
//         done: index === array.length - 1,
//       };
//     },
//   };
// }
//
// const get1 = makeIterator([1, 2, 3, 4, 5]);
// console.log(get1.next());
// console.log(get1.next());
// console.log(get1.next());

const o = {
  arr: [1, 2, 3, 4, 5, 6],
  [Symbol.iterator]() {
    const that = this;
    let index = 0;
    return {
      next() {
        return {
          // eslint-disable-next-line no-plusplus
          value: that.arr[index++],
          done: index > that.arr.length,
        };
      },
    };
  },
};

// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of o) {
  console.log(key, value);
}
