interface Options{
    method:'get'|'post'|'head'|'delete';
    data?:object|null|undefined;
    body?:object|null|undefined;
    header?:object|null|undefined;
}

class Request{
    constructor() {

    }
    requestJson=(url,option:Options={method:'get',data:null,body:null,header:null})=>{  //返回值将被处理成可直接使用的javaScript对象
        const that = this;
        const method = {
            'get':that.$get.bind(that,'json'),
            'post':that.$post.bind(that,'json'),
            'head':that.$head.bind(that,'json'),
            'delete':that.$delete.bind(that,'json')
        }
        return method[option.method||'get'](url,option.data,option.body,option.header)
    }
    requestText=(url,option:Options={method:'get',data:null,body:null,header:null})=>{ //返回值将被处理成字符串
        const that = this;
        const method = {
            'get':that.$get.bind(that,'text'),
            'post':that.$post.bind(that,'text'),
            'head':that.$head.bind(that,'text'),
            'delete':that.$delete.bind(that,'text')
        }
        return method[option.method||'get'](url,option.data,option.body,option.header)
    }
    $get(responseType:'json'|'text' = 'json',url,data,header){ // GET 请求方法
        const that = this;
        if(data &&  !(data instanceof Object) ) return new Error('data must be object (data形参必须是一个对象)');
        return new Promise(function (resolve, reject){
            const request = new XMLHttpRequest(); //首先创建一个请求实例;
            that.addReadyStateChangeEvent(request,responseType).then(response=>resolve(response)).catch(err=>reject(err))
            that.setHeader(request,header);
            if(data){ //有请求参数
                let attributes = Object.entries(data).map(function (item,index){
                    return item.join('=');
                }).join('&');
                request.open('get',url+'?'+attributes); //开启一个请求路径
            }else{ //无请求参数
                request.open('get',url); //开启一个请求路径
            }
            request.send();  //向服务器发送请求;
        })
    }
    $post(responseType:'json'|'text' = 'json',url,data,body,header){
        const that = this;
        if(data &&  !(data instanceof Object) ) return new Error('data must be object (data形参必须是一个对象)');
        if(body &&  !(body instanceof Object) ) return new Error('body must be object (body形参必须是一个对象)');
        return new Promise(function (resolve, reject){
            const request = new XMLHttpRequest(); //创建一个请求实例;
            that.addReadyStateChangeEvent(request,responseType).then(response=>resolve(response)).catch(err=>reject(err))
            that.setHeader(request,header);
            request.open('post',url); //开启一个网络请求路径
            if(data){ //有参数且为formData格式,执行代码块内的代码
                const formDate = new FormData();
                let requestData = Object.entries(data);
                if(requestData.length){ //有携带有效请求参数
                    requestData.forEach(function (item:any[]){
                        let key = item[0],value = item[1]
                        if(formDate.has(item[0])){
                            formDate.set(key,value||'')
                        }else{
                            formDate.append(key,value)
                        }
                    })
                }
                request.send(formDate)
            }else if(body){ //有参数且为bodyJson格式,执行代码块内的代码
                request.send(JSON.stringify(body));
            }else{ //无请求参数
                request.send();
            }
        })
    }
    $head(responseType:'json'|'text' = 'json',url:string,data:object|null|undefined,body:object|null|undefined,header:object|undefined|null){
        const that:any = this;
        if(header && !(header instanceof Object)) throw new Error('header must be object (header形参必须是一个对象)');
        return new Promise(function (resolve, reject){
            const request:XMLHttpRequest = new XMLHttpRequest(); //创建一个请求实例;
            that.addReadyStateChangeEvent(request,responseType).then(response=>resolve(response)).catch(err=>reject(err))
            request.open('head',url);
            that.setHeader(request,header);
            request.send();
        })
    }
    $delete(responseType:'json'|'text' = 'json',url:string,data:object|null|undefined,body:object|null|undefined,header:object|undefined|null){

    }
    addReadyStateChangeEvent(request,responseType:'json'|'text'='json'){ //实例添加请求步骤监听事件方法
        return new Promise(function (resolve, reject){
            request.onreadystatechange = function (){ //为实例设置步骤监听事件
                if(this.readyState === 4){ //判断当服务器响应完成之后执行代码块内的代码
                    if( this.status >=200 && this.status < 300 ){ //判断服务器响应的状态码是否为成功
                        //响应成功执行此代码块内的代码
                        if(responseType === 'json'){
                            resolve(JSON.parse(this.response))
                        }else{
                            resolve(this.response&&JSON.stringify(this.response))
                        }
                    }else{
                        //响应失败执行此代码块内的代码
                        reject(this.response)
                    }
                }
            }
        })
    }
    setHeader(request,header:any){
        if(header && !(header instanceof Object)) throw new Error('header must be object (header形参必须是一个对象)');
        if(header){ //有请求头部信息;
            let headers = Object.entries(header);
            headers.forEach(function (item:any[]){
                if(item[1]) request.setRequestHeader(item[0],item[1]);
            })
        }
    }
}

export default new Request();