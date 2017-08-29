<?php
namespace Home\Controller;
use Think\Controller;
class LearnController extends Controller {
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

     //   $learn_res= D('learn_list');

      //  $detail= $learn_res->where("theme like '%$theme%'")->select();



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
    function learn_insert(){ //新增数据
        $learn_res= D('learn_list');
        $ndate=date("Y-m-d H:i:s");
        $data=array(id=>guid(),'theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'),create_time=>$ndate);
         $learn_res->add($data);
        header("Location:/Learn/learn_list.html");
    }

    function learn_edit(){ //编辑数据
        $id=I('post.id');
        $learn_res= D('learn_list');
        $data=array('theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'));
        $map['id']=$id;
        $detail= $learn_res->where($map)->save($data);
        header("Location:/Learn/learn_list.html");
    }
    function learn_search(){ //搜索数据
        $theme=I('post.theme');
        $type=I('post.type');
        header("Location:/Learn/learn_list.html?theme=$theme&type=$type");
    }
}