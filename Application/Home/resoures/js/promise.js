/**
 * Created by danlu on 2017/9/28.
 */
(function (window){
    function Promise(call){
        var that=this;
        this.sever=30;
        this._status;
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
        /*执行promise的call*/
        _excCall:function(){
            var that=this;
            that._call&&that._call(function(p){
                that._fullfilled.call(that,p);
            },function(p){
                that._rejected.call(that,p);
            });
        },
        /*传入promise执行成功与失败的回调函数*/
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
        resolve:function(param){  //需要在构建
            if(this.isPromise(param))return param;
            if(!param){//没有参数
                return new Promise()._rejected();
            }
            if(typeof param=="string" || typeof param=="number" ||(typeof param=="object"&&typeof param.then=="undefined")){
                return new Promise()._rejected(param);
            }
            if(typeof param=="object"&&typeof param.then!="undefined"){ //具有then的对象
                var p=new Promise();
                p._call=param.then;
                p.init();
                return p;
            }
        },
        reject:function(param){
            var p= new Promise();
            p._rejected(param);
            return p;
        },
        /*修改该实例的状态--成功*/
        _fullfilled:function(p){
            this._status='resolve';
            this.param.resolve=p;
            var result=this._handle(p);
            this.paramResult.resolve=result;
            this._resultHandle(result);
            return result;
        },
        /*修改该实例的状态--失败*/
        _rejected:function(p){
            this._status='reject';
            this.param.reject=p;
            var result=this._handle(p);
            this.paramResult.reject=result;
            this._resultHandle(result);
            return result;
        },
        /*call执行成功的回调*/
        _cResolve:function(){
            if(typeof this.callParam.resolve!='undefined'){
                return  this.callParam.resolve.apply(this,this.param.resolve);
            }
        },
        /*call执行失败的回调*/
        _cReject:function(p){
            if(typeof this.callParam.reject!='undefined'){
                return  this.callParam.reject.apply(this,this.param.reject);
            }
        },

        /*call结果处理函数*/
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
        /*then返回结果处理*/
        _resultHandle:function(result){
            if(this.isPromise(result)){
                result.then(this.newPromise.callParam.resolve,this.newPromise.callParam.resolve);
                result.newPromise=this.newPromise.newPromise;
                this.newPromise=result;
            }else if(this.newPromise){
                if(this._status=='resolve'){
                    this.newPromise._fullfilled(result);
                }else {
                    this.newPromise._rejected(result);
                }
            }
        }
    };
    Promise.all=Promise.prototype.all;
    window.Promise=Promise;
})(window);

/*
* dlPager:用于丹露交易平台的分页插件
* eg:html 需添加<div page-total="true"  id="page-content"  page-first="true" page-last="true"   page-prev="true" page-next="true" page-search='true' page-list='600' page-size='10' page-current='5' every-page='10,20,30,40'></div>
*    new dlPager({contentId:'page-content',loading:function(obj){}})
* param:obj={
* pageSearch:false,//是否添加跳转到某页，默认false
* pagePrev:true,//是否显示上一页，默认true
* pageNext:true,//是否显示下一页，默认true
* pageFirst:false,//是否显示第一页，默认false
* pageLast:false,//是否显示最后一页，默认false
* pageTotal:true,//是否显示总页数，默认true
* pageSize:20,//每页的条数，默认20
* everyPage:[10,20,30,40],//下拉的分页条数，只有在pageSearch=true时出现默认[10,20,30,40]，通过属性传入时需要添加属性 every-page='10,20,30,40'
* loading:function(){},//当前页改变后的回调
* pageList:0//数据的总条数
* }
*
* 注：dlPager的参数可通过dom的属性（attr）与和对象实例化的时候（param）进行穿参，优先级param>attr
*
*
* */

(function(window){
    var dlPager=function(obj){
        var def={
            pageSearch:false,//是否添加跳转到某页，默认false
            pagePrev:true,//是否显示上一页，默认true
            pageNext:true,//是否显示下一页，默认true
            pageFirst:false,//是否显示第一页，默认false
            pageLast:false,//是否显示最后一页，默认false
            pageTotal:true,//是否显示总页数，默认true
            pageSize:20,//每页的条数，默认20
            everyPage:[10,20,30,40],//下拉的分页条数，
            loading:function(){},//当前页改变后的回调
            pageList:0,
            pageCurrent:1
        }
        if(this.isEmpty(obj.contentId)){
            return
        };
        this.content=document.getElementById(obj.contentId);
        var attrObj={
            pageSearch:this.attr(this.content,'page-search')=='false'?false:true,//跳转到某页
            pagePrev:this.attr(this.content,'page-prev')=='false'?false:true,//是否显示上一页
            pageNext:this.attr(this.content,'page-next')=='false'?false:true,//是否显示下一页
            pageFirst:this.attr(this.content,'page-first')=='true'?true:false,//是否显示第一页
            pageLast:this.attr(this.content,'page-last')=='true'?true:false,//是否显示最后一页
            pageTotal:this.attr(this.content,'page-total')=='false'?false:true,//是否显示总页数
           // pageAll:
            pageList:this.attr(this.content,'page-list')?parseInt(this.attr(this.content,'page-list')):0 //数据总条数
        }
        this.attr(this.content,'page-size')?attrObj.pageSize=parseInt(this.attr(this.content,'page-size')):'';
        this.attr(this.content,'page-current')?attrObj.pageCurrent=parseInt(this.attr(this.content,'page-current')):1;
        var list=this.attr(this.content,'every-page')?this.attr(this.content,'every-page'):null;
        list?attrObj.everyPage=list.split(','):'';
        this.joinObj(def,attrObj,obj);
        if (def.pageList % def.pageSize == 0) {
            def.pages = def.pageList / def.pageSize;
        }else {
            def.pages = parseInt(def.pageList /def.pageSize)+1;
        }
        ;
        this.param=def;
        this._init()
    }
    dlPager.prototype={
        constructor:dlPager,
        _init:function(){
            this.createPage();
        },
        createPage:function(){
            this.content.innerHTML=''
            var that=this;
            var def=this.param;
            var pageCurrent=def.pageCurrent;
            var totalPage=def.pages;
            var p=this.createDom('div','','page-content');
            var el;
            if(def.pageFirst){
                var first=this.createDom('span','首页','pager-first pager-item');
                that.addEvent(first,'click',that.addclick(1));
                p.appendChild(first);
            }
            if(def.pagePrev){
                var prev=this.createDom('span','','pager-prev pager-item pager-img');
                if(def.pageFirst){
                    var prev=this.createDom('span','上一页','pager-prev pager-item');
                }
                if(def.pageCurrent==1)this.addClass(prev,'pager-disabled');
                if(def.pageFirst||(!def.pageFirst&&pageCurrent!=1)){
                    p.appendChild(prev);
                }
                !this.hasClass(prev,'pager-disabled')&&that.addEvent(prev,'click',that.addclick(pageCurrent-1));
            }
            var fragment=document.createDocumentFragment()
            if(pageCurrent-1>3){
                 el=this.createDom('span','1','pager-item');
                that.addEvent(el,'click',that.addclick(1));
                p.appendChild(el);
                el=this.createDom('span','…','pager-more');
                p.appendChild(el);
                if(totalPage-pageCurrent+2<4){
                    for(var i= totalPage-4;i<pageCurrent-2;i++){
                        el=this.createDom('span',i,'pager-item');
                        (function (i){
                            that.addEvent(el,'click',that.addclick(i));
                        })(i)
                        if(i==pageCurrent){
                            this.addClass(el,'pager-current');
                        }
                        p.appendChild(el);
                    }
                }
                el=this.createDom('span',pageCurrent-2,'pager-item');
                that.addEvent(el,'click',that.addclick(pageCurrent-2));
                p.appendChild(el);
                el=this.createDom('span',pageCurrent-1,'pager-item');
                that.addEvent(el,'click',that.addclick(pageCurrent-1));
                p.appendChild(el);
                el=this.createDom('span',pageCurrent,'pager-item pager-current');
                that.addEvent(el,'click',that.addclick(pageCurrent));
                p.appendChild(el);
            }else {
                var num=5;
                for(var i= 1;i<num+1;i++){
                    el=this.createDom('span',i,'pager-item');
                    if(i==pageCurrent){
                        this.addClass(el,'pager-current');
                    }
                    (function (i){
                        that.addEvent(el,'click',that.addclick(i));
                    })(i)
                    p.appendChild(el);
                }
            }
            if(totalPage-pageCurrent>2){
                if(pageCurrent>=5) {
                    el = this.createDom('span', pageCurrent + 1, 'pager-item');
                    that.addEvent(el, 'click', that.addclick(pageCurrent + 1));
                    p.appendChild(el);
                    el = this.createDom('span', pageCurrent + 2, 'pager-item');
                    that.addEvent(el, 'click', that.addclick(pageCurrent + 1));
                    p.appendChild(el);
                }
                el=this.createDom('span','…','pager-more');
                p.appendChild(el);
                el=this.createDom('span',totalPage,'pager-item');
                that.addEvent(el,'click',that.addclick(totalPage));
                p.appendChild(el);
            }else{
                var init=pageCurrent+1;
                for(var i= init;i<totalPage+1;i++){
                    el=this.createDom('span',i,'pager-item');
                    (function (i){
                        that.addEvent(el,'click',that.addclick(i));
                    })(i)
                    if(i==pageCurrent){
                        this.addClass(el,'pager-current');
                    }
                    p.appendChild(el);
                }
            }

            if(def.pageNext){
                var next=this.createDom('span','','pager-next pager-item pager-img');
                if(def.pageLast){
                    var next=this.createDom('span','下一页','pager-next pager-item');
                }
                if(def.pageCurrent==totalPage)this.addClass(next,'pager-disabled');
                if(def.pageLast||(!def.pageLast&&pageCurrent!=totalPage)){
                    p.appendChild(next);
                }
                !this.hasClass(next,'pager-disabled')&&that.addEvent(next, 'click', that.addclick(pageCurrent + 1));
            }
            if (def.pageLast){
                var last=this.createDom('span','尾页','pager-last pager-item');
                that.addEvent(last, 'click', that.addclick(totalPage));
                p.appendChild(last);
            }
            this.addTotalPage(p);
            this.addPageSearch(p);
            this.addSizeChange(p);
            this.content.appendChild(p);
        },
        pageSizeChange:function(pageSize){
            var def=this.param;
            if(this.isEmpty(pageSize))return;
            def.pageSize=pageSize;
            if (def.pageList % def.pageSize == 0) {
                def.pages = def.pageList / def.pageSize;
            }else {
                def.pages = parseInt(def.pageList /def.pageSize)+1;
            }
            def.pageCurrent=1;
            this.createPage(this.pageCurrent);
        },
        addclick:function(page){
            var that=this;
            var page=page;
            return function (){
                if(page>that.param.pages){
                    page=that.param.pages;
                }
                if(page<1){
                    page=1;
                }
                that.param.pageCurrent=page;
                that.createPage();
                that.param.loading(that.param)
            }
        },
        pageChange:function(pageCurrent){
            var def=this.param;
            def.pageCurrent=pageCurrent;
            this.createPage(this.pageCurrent);
        },
        addTotalPage:function(p){
            var def=this.param;
            if(!def.pageTotal||this.isEmpty(p))return;
            var el=this.createDom('span','共'+def.pages+'页','pager-total');
            p.appendChild(el);
        },
        addPageSearch:function(p){
            var that=this;
            var def=this.param;
            if(!def.pageSearch||this.isEmpty(p))return;
            var html='<label>跳转到第</label> <input type="number" min="1"  class="pager_input"> <label>页</label><button type="pager-button" class="laypage_btn">确定</button>'
            var el=this.createDom('span',html,'pager-search');
            var input=el.getElementsByTagName('input')[0];
            var btn=el.getElementsByTagName('button')[0];
            this.addEvent(input,'keyup',function(){
                this.value=this.value.replace(/\D/, '');
            });
            this.addEvent(btn,'click',function(){
                var v= input.value;
                if(!that.isEmpty(v)){
                    that.pageChange(parseInt(v));
                    that.param.loading(that.param)
                }
            });
            p.appendChild(el);
        },
        addSizeChange:function(p){
            var that=this;
            var def=that.param;
            var html=' <span>每页显示</span><select class="selectPageSize">'
            if(!def.pageSearch||this.isEmpty(p))return;
            var everyPage=def.everyPage;
            var pageSize=def.pageSize;
            for(var i= 0,len=everyPage.length;i<len;i++){
                var item=everyPage[i];
                if(pageSize==item){
                    html+='<option value="'+item+'" selected="selected">'+item+'</option>'
                }
                else {
                    html+='<option value="'+item+'" >'+item+'</option>'
                }
            }
            html+='</select><span>条</span>';
            var el=this.createDom('div',html,'selectPage');
            var select=el.getElementsByTagName('select')[0];
            this.addEvent(select,'change',function(){
                var num= this.selectedIndex;
                var v=this.options[num].value;
                if(!that.isEmpty(v)){
                    that.pageSizeChange(parseInt(v));
                    that.param.loading(that.param)
                }
            });
            p.appendChild(el);
        },
        isEmpty:function (obj){
            if (typeof obj == 'undefined' || obj == null || obj == {} || obj == '' || obj.length <= 0)return true;
            return false
        },
        attr:function(domObj,attrName){
            var name=domObj.getAttribute(attrName);
            if(this.isEmpty(name))return null
            return name;
        },
        joinObj:function(){
          var target= arguments[0],
            len=arguments.length,
              copy={};

            if(len==1){
                target=this;

            }
            for(var i= 0;i<len;i++){
                copy=arguments[i];
                for(var key in copy){
                    !this.isEmpty(copy[key])&&(target[key]=copy[key]);
                }
            }
            return target;
        },
        createDom:function(tagName,html,className){
            var dom= document.createElement(tagName)
            dom.innerHTML=html;
            if(className)this.addClass(dom,className);
            return dom;
        },
        hasClass : function(element, className) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            return element.className.match(reg);
        },
        addClass:function(element, className) {
            if (!this.hasClass(element, className)){
                element.className += " "+className;
            }
        },
        removeClass : function(element, className) {
            if (this.hasClass(element, className)) {
                var reg = new RegExp('(\s|^)'+className+'(\s|$)');
                element.className = element.className.replace(reg,' ');
            }
        },
       addEvent:function (el, type, fn) {
            if (document.addEventListener) {
                if(!el){
                    return false;
                }
                el.addEventListener(type, fn, false);
            } else {
                if(!el){
                    return false;
                }
                el.attachEvent('on' + type, function () {
                    return fn.call(el, window.event);
                });
            }
        }
    }

    window.dlPager=dlPager;
})(window);
new dlPager({contentId:'page-content',loading:function(obj){
    console.log(obj.pageCurrent);
}})