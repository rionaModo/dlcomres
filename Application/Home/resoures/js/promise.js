/**
 * Created by danlu on 2017/9/28.
 */


function Promise(call){
    var that=this;
    this.sever=30;
    this.timeout=3000;
    this._status;
    this._cResolve;
    this._cReject;
    this._execute=false;//是否执行then的回调
    this.promises=[];
    //失败或者成功的参数
    this.param={
        resolve:undefined,
        reject:undefined
    };
//失败或者成功的回调函数
    this.callParam={
        resolve:undefined,
        reject:undefined
    };
    //失败或者成功的回调函数的返回结果
    this.paramResult={
        resolve:undefined,
        reject:undefined
    };
    function def(r,j){
       var that=this;
        r.call(this);
    }
    call=call||def;
    call(function(){
        that._fullfilled.call(that)
    },function(){
        that._rejected.call(that)
    });
    return this;
};


Promise.prototype = {
    then:function(resolve,reject){
        this.callParam.resolve=resolve;
        this.callParam.reject=reject;
        this._handle();
        this.newPromise=new Promise();
        this.newPromise.parent=this;
        return  this.newPromise;
    },
    all:function(promises){
        var p=new Promise();
        p.icon=3;
        (function(reject,resolve){
            var that=this;
            that.promises=promises;
            that.proS=[];
            for(var i= 0,len=promises.length;i<len;i++){
                var item=promises[i];
                item.icon=i;
                if(typeof item._status!="undefined"){
                    that.proS.push(item._status);
                    if(item._status=='reject'){
                        that._rejected();
                        return
                    }
                    if(that.proS.length==that.promises.length){
                        that._fullfilled();
                    }
                }else{
                    item._setOver(function(){
                        that.proS.push(item._status);
                        if(item._status=='reject'){
                            that._rejected();
                            return
                        }
                        if(that.proS.length==that.promises.length){
                            that._fullfilled();
                        }
                    });
                }
            }
        }).call(p,p._fullfilled, p._rejected);
        return p;

    },
    isPromise:function(obj){
        if(obj instanceof Promise)return true;
        return false;
    },
    _setOver:function(call){
        this._over=call;
    },
    _over:function(){

    },
    resolve:function(param){  //需要在构建
        if(this.isPromise(param))return
        return new Promise(function(r,j){param
        ;
            r();
        });
    },
    reject:function(param){
       var p= new Promise();
        p._rejected();
        return p;
    },
    /*修改该实例的状态--成功*/
    _fullfilled:function(p){
        this._status='resolve';
        this.param.resolve=p;
        var result=this._handle(p);
        this.paramResult.resolve=result;
        return result;
    },
    /*修改该实例的状态--失败*/
    _rejected:function(p){
        this._status='reject';
        this.param.reject=p;
        var result=this._handle(p);
        this.paramResult.reject=result;
        return result;
    },
    _cResolve:function(){
        if(typeof this.callParam.resolve!='undefined'){
            return  this.callParam.resolve(this.param.resolve);
        }
    },
     _cReject:function(p){
         if(typeof this.callParam.reject!='undefined'){
             return  this.callParam.resolve(this.param.reject);
         }
     },

    /*结果处理函数*/
    _handle:function(p){
        if(typeof this._status=='undefined')return;
        /*上次存在的处理*/











        

        var result;
        if(this._status=='resolve'){
            result=this._cResolve(p);
        }else{
            result=this._cReject(p);
        }
        this._over();
        return result;
    },
    _nextHandle:function(){}
};

Promise.prototype.constructor = Promise;
Promise.all=Promise.prototype.all;