<?php
namespace Home\Controller;
use Think\Controller;
class XiaohaoController extends Controller {
  public function learn_list(){ // 页面数据
         $theme=I('get.theme');
         $type=I('get.type');
         $page=I('get.p');
         $sql='';
         !empty($page)?'':$page=1;
         !empty($theme)?$sql=$sql."theme like '%{$theme}%'":'';
         !empty($type)?$sql!=''?$sql=$sql." AND type={$type}":$sql=" type={$type}":'';
         $sql!=''?$sql=$sql." AND enable=1":$sql=$sql=$sql.'enable=1';
         $limit=10;
         $pageStart=$limit*($page-1);
         $learn_list= D('learn_list')->where($sql)->order('create_time desc')->limit($pageStart.','.$limit)->select();
         $count      =  D('learn_list')->where($sql)->count();// 查询满足要求的总记录数
         $Page       = getpage($count,$limit,$page);// 实例化分页类 传入总记录数和每页显示的记录数(25)
         $this->assign('page',$Page);// 赋值分页输出
         $this->assign('learn_list', $learn_list);
         $this->display();
     }
     public function create(){ //创建查看页面
         $from=I('get.from');
         $detail[]=array();
         if(!empty($from)&&$from=='edit'){
             $id=I('get.id');
             $map['id'] = $id;
             $detail= M()->table('learn_list')->where($map)->select();
             $this->assign('detail', $detail);
         }
         $this->display();
     }
     public function create_list(){ //创建查看页面
      $theme=I('get.theme');
       $type=I('get.type');
       $page=I('get.p');
       $sql='';
       !empty($page)?'':$page=1;
       !empty($theme)?$sql=$sql."theme like '%{$theme}%'":'';
       !empty($type)?$sql!=''?$sql=$sql." AND type={$type}":$sql=" type={$type}":'';
       $sql!=''?$sql=$sql." AND enable=1":$sql=$sql=$sql.'enable=1';
       $limit=10;
       $pageStart=$limit*($page-1);
       $learn_list= D('learn_list')->where($sql)->order('create_time desc')->limit($pageStart.','.$limit)->select();
       $count      =  D('learn_list')->where($sql)->count();// 查询满足要求的总记录数

       $learn_data=array(
         total=>$count,
         data_list=>$learn_list
       );
       $this->ajaxReturn($learn_data, 'JSON');

          }
     function learn_insert(){ //新增数据
         $learn_res= D('learn_list');
         $ndate=date("Y-m-d H:i:s");
         if(empty(I('post.theme'))){
          exit('{"status":1,"msg":"主题不能为空"}');
         }
          if(empty(I('post.type'))){
             exit('{"status":2,"msg":"类型不能为空"}');
          }
          if(empty(I('post.content'))){
               exit('{"status":3,"msg":"内容不能为空"}');
          }
         $data=array(id=>guid(),'theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'),create_time=>$ndate);
          $learn_res->add($data);
          exit('{"status":0,"msg":"保存成功"}');
         header("Location:/Learn/learn_list.html");
     }

     function learn_edit(){ //编辑数据
         $id=I('post.id');
         $learn_res= D('learn_list');
         if(empty(I('post.id'))){
            exit('{"status":4,"msg":"id不能为空"}');
           }
         if(empty(I('post.theme'))){
           exit('{"status":1,"msg":"主题不能为空"}');
          }
           if(empty(I('post.type'))){
              exit('{"status":2,"msg":"类型不能为空"}');
           }
           if(empty(I('post.content'))){
                exit('{"status":3,"msg":"内容不能为空"}');
           }

         $data=array('theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'));
         $map['id']=$id;
         $detail= $learn_res->where($map)->save($data);
         exit('{"status":0,"msg":"保存成功"}');
     }
     function learn_search(){ //搜索数据
         $theme=I('post.theme');
         $type=I('post.type');
         header("Location:/Learn/learn_list.html?theme=$theme&type=$type");
     }
     function learn_delete(){ //删除数据
         $id=I('post.id');
         $learn_res= D('learn_list');
         if(empty(I('post.id'))){
            exit('{"status":1,"msg":"id不能为空"}');
           }
         $data=array('enable'=>0);
         $map['id']=$id;
         $detail= $learn_res->where($map)->save($data);
         exit('{"status":0,"msg":"保存成功"}');
     }
}