/**
 * 发布者/订阅者模式
 * 首先这个模式是来此与观察者模式的升级
 * 该模式的模型,是多堆多的关系,
 * 也就是说,发布者可以是订阅者, 订阅者也可以是发布者
 * 调度站作为一个中间方, 当订阅者发布消息的时候,告知调度者. 调度者通过发布者绑定订阅者, 来给发布者分发消息
 */

/**
 * 调度中心
 */
class ControlCenter {
    //发布者列表
    publisherMap = new Map();

    //订阅者列表与发布者关系列表
    subscriberList = new Map()

    /**
     * 添加发布者
     * @param pName 发布者的名称
     */
    addPublisher(pName) {
        if (this.getPublisherByPName(pName)) {
            throw '该发布者已经存在,不能重复添加'
        }
        // 把发布者添加到,发布这列表;
        this.publisherMap.set(pName, new Publisher(pName, this._postMessageByPublisher.bind(this)))
        // 创造一个该发布者的订阅者;
        this.subscriberList.set(pName,[])
    }

    /**
     * 根据发布者的名称,给发布者添加订阅者
     * @param pName 发布者名称
     * @param subscriber 订阅者对象
     */
    addSubscriberByPublisherName(pName, subscriber) {
        const subscriberList = this.getSubscriberListByPName(pName);
        // 判断该订阅者,是否已经订阅了该发布者
        if (subscriberList.indexOf(subscriber) >= 0) {
            throw `该订阅者,已经订阅了:${pName}该发布者`
        }
        // 如果没有订阅,那么订阅该发布者
        subscriberList.push(subscriber)
    }


    /**
     * 根据订阅者名称返回订阅号者实例
     */
    getPublisherByPName(pName) {
        return this.publisherMap.get(pName)
    }


    /**
     * 监听订阅者发布信息, 并且发送给所有订阅了该发布者的订阅者们;
     * @param pName
     * @param message
     * @private
     */
    _postMessageByPublisher(pName, message) {
        const subscriberList = this.getSubscriberListByPName(pName);
        subscriberList.forEach(item => {
            item.callBack.call(item, message);
        })
    }

    /**
     * 根据发布者名称,返回订阅了该发布者的所有订阅者
     * @param pName
     */
    getSubscriberListByPName(pName) {
        return this.subscriberList.get(pName);
    }
}

/**
 * 发布者
 */
class Publisher {
    constructor(pName, fun) {
        this.pName = pName;
        this._postMessage = fun
    }

    /**
     * 订阅者发布消息
     * @param data
     */
    postMessage(message) {
        console.log(`发布者:${this.pName}\n 发布信息:${message}`)
        this._postMessage(this.pName, message)
    }


}

/**
 * 订阅者
 */
class Subscriber {
    // 订阅者的名称
    sName = ''

    constructor(sName) {
        this.sName = sName
    }

    // 获取消息后,执行回调
    callBack(message) {
        console.log(`发布者:${this.sName}\n 接受信息:${message}`)
    }
}


//测试
// 调度中心实例
const controlCenter = new ControlCenter();

const pName = '小明';

const sName1 = '小红';
const sName2 = '小绿';

// 添加一个名字叫小明的发布者
controlCenter.addPublisher(pName);

// 给名字叫小明的发布者添加订阅者
controlCenter.addSubscriberByPublisherName(pName, new Subscriber(sName1))
controlCenter.addSubscriberByPublisherName(pName, new Subscriber(sName2))


//返回发布者实例
const publisher = controlCenter.getPublisherByPName(pName);

publisher.postMessage('你好')
