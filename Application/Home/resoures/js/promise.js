/**
 * Created by danlu on 2017/9/28.
 */

var m=0;
function Promise(call){
    var that=this;
    this.sever=30;
    this.sort=m++;
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
    this._call=call;
    this.init();
    return this;
};


Promise.prototype = {
    constructor:Promise,
    init:function(){
        var that=this;
        setTimeout(function(){
            that._excCall.call(that)
        },0)
    },
    _excCall:function(){
        var that=this;
        that._call&&that._call(function(p){
            that._fullfilled.call(that,p);
        },function(p){
            that._rejected.call(that,p);
        });
    },
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
        p.param={
            resolve:[],
            reject:[]
        };
        p.icon=3;
        p._call=function(reject,resolve){
            var that=this;
            that.promises=promises;
            that.proS=[];
            for(var i= 0,len=promises.length;i<len;i++){
                var item=promises[i];
                if(typeof item._status!="undefined"){
                    that.proS.push(item._status);
                    if(item._status=='reject'){
                        that._rejected();

                        return
                    }
                    that.param.resolve.push(item.param.resolve);
                    if(that.proS.length==that.promises.length){
                        that._fullfilled(that.param.resolve);
                    }
                }else{
                    item._setOver(function(){
                        that.proS.push(this._status);
                        if(this._status=='reject'){
                            that._rejected();
                            return
                        }
                        that.param.resolve.push(this.param.resolve);
                        if(that.proS.length==that.promises.length){
                            that._fullfilled(that.param.resolve);
                        }
                    });
                }
            }
        };
        p.init.call(p);
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
    resolve:function(obj){  //需要在构建
        if(this.isPromise(obj))return
        return new Promise(function(r,j){
            obj
        ;
            r();
        });
    },
    reject:function(){
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
        if(this.isPromise(result)){
            result.then(this.newPromise.callParam.resolve,this.newPromise.callParam.resolve);
            result.newPromise=this.newPromise.newPromise;
            this.newPromise=result;
        }else if(this.newPromise){
            this.newPromise._fullfilled(result);
        }
        return result;
    },
    /*修改该实例的状态--失败*/
    _rejected:function(p){
        this._status='reject';
        this.param.reject=p;
        var result=this._handle(p);
        this.paramResult.reject=result;
        if(this.isPromise(result)){
            result.then(this.newPromise.callParam.resolve,this.newPromise.callParam.resolve);
            result.newPromise=this.newPromise.newPromise;
            this.newPromise=result;
        }else if(this.newPromise){
            this.newPromise._rejected(result);
        }
        return result;
    },
    _cResolve:function(){
        if(typeof this.callParam.resolve!='undefined'){
            return  this.callParam.resolve.apply(this,this.param.resolve);
        }
    },
     _cReject:function(p){
         if(typeof this.callParam.reject!='undefined'){
             return  this.callParam.reject.apply(this,this.param.reject);
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


Promise.all=Promise.prototype.all;