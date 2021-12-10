class A{
  log(){
    console.log("父接口的方法");
  }
}

class A1 extends A{
  // 重写父类的方法
  log(){
    console.log("这是第一个功能");
  }
}

class A2 extends A{
  // 重写父类的方法
  log(){
    console.log("这是第二个功能");
  }
}


class DecoratorMode extends A{
    constructor(a1) {
      super()
      this.a = a1
    }
    log(){

      this.a.log()
    }
}



a1 = new DecoratorMode(new A1());
a2 = new DecoratorMode(new A2())

a1.log()
a2.log()
