
//事件总线
class EventEmitter {
    cache = {}
    /**
     *
     * @param eventName 事件名
     * @param callback 事件回调
     */
    on(eventName, callback) {
        this._addEvent(eventName, callback)
    };

    _addEvent(eventName, callback,once = false){
        if(this._isCacheByName(eventName)){
            this._getCallbackListByEventName(eventName).push(callback)
        }else{
            this.cache[eventName] = {
                callbackList:[callback],
                once
            }
        }
    };

    emit(eventName, data) {
        const {callbackList,once} = this.cache[eventName];
        callbackList.forEach(item => item(data));
        once && delete this.cache[eventName];
    }

    once(eventName, callback) {
        this._addEvent(eventName, callback,true)
    }

    remove(eventName,callback) {
        if(!this._isCacheByName(eventName)){
            throw '不存在该事件'
        }
        const callbackList = this._getCallbackListByEventName(eventName),
            index = callbackList.indexOf(callback);
        (index >= 0) && callbackList.splice(index,1)
    }

    removeAll(eventName){
        delete this.cache[eventName]
    }

    _getCallbackListByEventName(eventName) {
        return this.cache[eventName] && this.cache[eventName]['callbackList']
    }

    _isCacheByName(eventName){
        return !!this.cache[eventName];
    }

}
const e = new EventEmitter()

e.on('test',() =>{
    console.log('这是测试1');
})
e.emit('test')

e.once('once',() => {
    console.log('这是一次函数1');
})
e.once('once',() => {
    console.log('这是一次函数2');
})
e.emit('once')
