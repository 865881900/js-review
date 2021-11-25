//原型链继承,返回一个
function prototypeChainExtends(parentCon, childCon) {
    if (myTypeof(parentCon) !== 'function' || myTypeof(childCon) !== 'function') {
        throw '参数必须为函数'
    }
    childCon.prototype = new parentCon();
    return childCon;
}

// 借用构造函数继承
function constructorChainExtends(parentCon) {
    if (myTypeof(parentCon) !== 'function') {
        throw '参数必须为函数'
    }
    let childCon = function () {
        parentCon.call(this, arguments)
    }
    childCon.prototype = new parentCon()
    return childCon
}

//组合继承, 用
function conAndProExtends() {
    //这是需要继承的类
    const ParentCon = function (age) {
        this.age = age
    };
    ParentCon.prototype.getAge = function () {
        console.log('修改age')
        return this.age
    };
    // 这是派生类
    const ChildCon = function (name, age) {
        this.name;
        ParentCon(age)
    };
    const parentCon = new ParentCon();
    parentCon.constructor = ChildCon;
    ChildCon.prototype = parentCon;
}

//寄生组合继承
function parasitismExtends() {
    //这是需要继承的类
    const ParentCon = function (age) {
        this.age = age
    }
    // 被继承类的方法,设置在他的原型对象上
    ParentCon.prototype.getAge = function () {
        console.log('修改age')
        return this.age
    }
    // 这是派生类
    const ChildCon = function (name, age) {
        this.name;
        ParentCon(age)
    }
    // 声明这个函数的目的,是用来继承父类原型中的的方法
    const F = function () {
    };
    //指向父类的原型
    F.prototype = ParentCon.prototype;
    // 继承方法
    ChildCon.prototype = new F();
    // 设置原型的构造函数为子类
    ChildCon.prototype.constructor = ChildCon;
    return ChildCon
}

//创造对象
function aa(name, age){
    let o = new Object();
    o.name = name;
    o.age = age;
    o.getName = function (){
        return this.name
    }
    return o
}
//无副作用继承
function aa(name, age){
    let o = new Object();
    o.prototype.getName = function () {
        return name
    }
    return o
}


class ParentCon {
    age = ''

    constructor(age) {
        this.age = age
    }
}

class ChildCon extends ParentCon {
    name = ''

    constructor(name, age) {
        super(age);
        this.name = name
    }
}
