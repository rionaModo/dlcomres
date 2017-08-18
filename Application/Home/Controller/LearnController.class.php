<?php
namespace Home\Controller;
use Think\Controller;
class LearnController extends Controller {
    public function learn_list(){ // 页面数据
        $learn_list= D('learn_list')->where('enable=1')->select();
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
    function learn_insert(){ //新增数据
        $learn_res= D('learn_list');
        $data=array(id=>guid(),'theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'));
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
}