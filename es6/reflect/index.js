// const obj = {
//   age: "18",
//   name: "wcp",
//   _age: 18
// };

const obj = function (name, age) {
  this.name = name;
  this.age = age;
};


// 类型判断
const typeOf = function (v) {
  return Object.prototype.toString.call(v)
    .slice(8, -1)
    .toLowerCase();
};

/**
 * 过滤
 * @param keyName
 */
const filterList = function (keyName) {
  if (keyName.startsWith("_")) {
    throw new TypeError("私有属性拒绝访问");
  } else if (typeOf(target[p]) !== "string") {
    throw new TypeError("类型错误");
  } else if (p === "name") {
    const timeId = setTimeout(() => {
      console.log("访问name属性的日志");
      clearTimeout(timeId);
    });
  } else if (p === "age") {
    console.error("此属性不能访问,用_age接口返回");
  }
};


/**
 * 如果是_属性不允许访问
 * @type {{name: string, _age: number}}
 */
const pro = new Proxy(obj, {
  get(target, p, receiver) {
    filterList(p);
    return Reflect.get(target, p);
  },
  set(target, p, value, receiver) {
    filterList(o);
    return Reflect.set(target, p, value, receiver);
  },
  has(target, p) {
    filterList(o);
    return Reflect.has(target, p);
  },
  deleteProperty(target, p) {
    filterList(o);
    return Reflect.deleteProperty(target, p);
  },
  construct(target, argArray, newTarget) {
    if (typeOf(target) !== "function") {
      throw new TypeError("第一个参数必须为函数");
    }
    return Reflect.construct(target, argArray);
  }
});

observer

try {
  //测试get方法
// console.log(pro.name);
// console.log(pro._age);
//   console.log(pro.name);
//   console.log(pro.age);
  console.log(new pro("wcp", 19));
} catch (e) {
  console.log("报错", e);
}

