// 被观察对象
class BeObserved {
    // 当前被观察者的观察对象
    observedList = []

    // 发布消息
    postMessage(message) {
        const observedList = this.observedList;
        observedList.flatMap(item => {
            item.callback.call(item,message)
        })
    }

    /**
     * 给当前被观察对象添加观察者
     * @param observed 需要添加的观察者
     */
    addObserved(observed) {
        const observedList = this.observedList;

        // 判断是否已经有了该观察者
        if (observedList.indexOf(observed) >= 0) {
            throw  '该观察者已经存在'
        }
        observedList.push(observed)
    }

    /**
     * 在观察者列表中删除该观察者
     * @param observed 需要删除的观察者
     */
    deleteObserve(observed) {
        const observedList = this.observedList,
            index = observedList.indexOf(observed);
        if (index < 0) {
            throw  '该观察者不存在'
        }
        observedList.splice(index, 1)
    }

}

class Observed {
    // 观察者名称
    oName = ''

    constructor(oName) {
        this.oName = oName
    }

    // 当发现被观察者发送信息, 触发该回调
    callback(message) {
        console.log(`名称为:${this.oName} \n 接受到的信息:${message}`)
    }
}

// 创建被观察者对象
const beOb = new BeObserved()

// 创建观察者对象1
const ob1 = new Observed('这是小明')
// 创建观察者对象2
const ob2 = new Observed('这是小红')

// 给被观察对象添加观察者
beOb.addObserved(ob1)
beOb.addObserved(ob2)

//被观察对象发送信息
beOb.postMessage('你好');


