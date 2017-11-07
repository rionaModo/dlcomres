#删除接口
接口：/Xiaohao/learn_delete.php
method:POST
入参:{id:''}
content-type:application/x-www-form-urlencoded
接口返回：json格式
         {"status":0,     //0表示成功，1表示失败
          "msg":"保存成功"
          }


#查询接口
接口：/Xiaohao/create_list.php
method:GET
入参:theme:''  //主题
     type:'',  //类型  数字类型的 1、2、3、4
     p:1   //分页  1,2，3
例子：/Xiaohao/create_list.php?theme=肖红&type=1
接口返回：{
  total：22， 总条数
  data_list:[{},{}]  当前页S数据
}


#主题判重
接口：/Xiaohao/theme_isrepeat.php
method:POST
入参:{theme:''}//主题
content-type:application/x-www-form-urlencoded
接口返回：json格式
         {"status":0,     //0表示不重复，1表示重复
          "msg":"保存成功"
          }




#修改
接口：/Xiaohao/learn_edit.php
method:POST
content-type:application/x-www-form-urlencoded
入参:theme:''  //主题
     type:'',  //类型  数字类型的 1、2、3、4
     content:1   //内容
     id:    //编辑数据的id

接口返回：json格式
{"status":4,"msg":"id不能为空"}
{"status":1,"msg":"主题不能为空"}
{"status":2,"msg":"类型不能为空"}
{"status":3,"msg":"内容不能为空"}
{"status":0,"msg":"保存成功"}


#获取一条数据详情
接口：/Xiaohao/learn_detail.php
method:POST
content-type:application/x-www-form-urlencoded
入参:{id:}    //数据的id

接口返回：json格式
[{
 theme:''  //主题
 type:'',  //类型  数字类型的 1、2、3、4
  content:1   //内容
}]


