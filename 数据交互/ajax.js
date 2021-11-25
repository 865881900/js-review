/**
 *
 * @param url 请求路径
 * @param data 请求参数
 * @param methodsType 请求方式
 */
function ajax(methodsType,url,data){
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject();
        xhr.open(methodsType,url,data)
        xhr.send();
        xhr.onload(() =>{
            resolve(xhr.response)
        })
        xhr.onerror((e) => reject(e))
    })

}
