/**
 *
 * @param oChain 原对象
 * @param oProto 原对象的新的原型
 * @return {Function}
 */
Object.appendChain = function(oChain, oProto) {
  if (arguments.length < 2) {
    throw new TypeError('Object.appendChain - Not enough arguments');
  }
  if (typeof oProto === 'number' || typeof oProto === 'boolean') {
    throw new TypeError('second argument to Object.appendChain must be an object or a string');
  }

  var oNewProto = oProto,
    oReturn,
    o2nd,
    oLast;

  // 判断是oChain是不是对象, 如果不是,创造一个
  oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);


  //返回原型方法
  for (var o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
    o2nd = o1st;
  }

  if (oProto.constructor === String) {
    oNewProto = Function.prototype;
    oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
    this.setPrototypeOf(oReturn, oLast);
  }

  this.setPrototypeOf(o2nd, oNewProto);
  return oReturn;
}

function A(name){
  this.name = name;
}
let b = {
  age:'18岁'
}

A.prototype = b;


let c = Object.create(new A('wcp'));


c.__prop__.__prop__ === b

