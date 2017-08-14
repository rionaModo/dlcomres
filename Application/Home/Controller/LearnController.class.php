<?php
namespace Home\Controller;
use Think\Controller;
class LearnController extends Controller {
    public function learn_list(){
        $learn_list= D('learn_list')->select();
        $this->assign('learn_list', $learn_list);
        $this->display();
    }
    public function create(){
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
    function learn_insert(){
        $learn_res= D('learn_list');
        $data=array(id=>guid(),'theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'));
         $learn_res->add($data);
    }

    function learn_edit(){
        $id=I('post.id');
        $learn_res= D('learn_list');
        $data=array('theme'=>I('post.theme'),'content'=>I('post.content'),type=>I('post.type'));
        $map['id']=$id;
        print_r($id);
        print_r($data);
        $detail= $learn_res->where($map)->save($data);//save($data);
    }
}