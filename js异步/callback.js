const test = function () {
  console.log('hello word');
};
test();

// 其中console.log 是算法, "hello word"是数据,程序的意义就是用算法操作数据,上面的代码是一个函数;
// 得出结论: 程序 = 算法 + 数据;
// 那么只要算法和数据只要有一个数可以改变的,那么函数就是有意义的;

const test1 = function (string) {
  console.log(string);
};

test1('你好世界');
// 上面的代码中, 我们数据变为可变的,这就是一般我们写的函数

const test2 = function (fun) {
  const string = '你好世界';
  fun(string);
};
test2(test1);

const a = {
  name: '小明',
  getName(fun) {
    fun();
  },
};
const fun = function () {
  console.log(this.name);
};

a.getName(fun.bind(a));
