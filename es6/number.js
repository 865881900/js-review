const num = 123_123_123;
console.log(num); // 123123123 === 123_123_123

// 静态方法,判断值是否为有效的
console.log(Number.isFinite(Infinity));
console.log(Number.isFinite(NaN));
console.log(Number.isFinite(12));

console.log(Math.trunc(12.3));
