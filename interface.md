#删除接口#
接口：/Xiaohao/learn_delete.php
method:POST
入参:{id:''}
content-type:application/x-www-form-urlencoded
接口返回：json格式
         {"status":0,     //0表示成功，1表示失败
          "msg":"保存成功"
          }


#查询接口#
接口：/Xiaohao/create_list.php
method:GET
入参:theme:''  //主题
     type:'',  //类型  数字类型的 1、2、3、4
例子：/Xiaohao/create_list.php?theme=肖红&type=1
接口返回：[{},{}]

