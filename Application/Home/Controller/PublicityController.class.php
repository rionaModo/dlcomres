<?php
namespace Home\Controller;
use Think\Controller;
class PublicityController extends Controller {
    public function publicity_list(){
       // $publicity_list= M()->table('publicity')->where('')->select();
        //$publicity_list= M('PublicityModel')->where('')->select();
        $publicity_list= D('Publicity')->select();
        print_r($publicity_list);
        $this->assign('publicity_list', $publicity_list);
        $this->display();
    }
    public function detail(){
        $publicity_id=I('get.id');
        $map['publicity_id'] = $publicity_id;
        $detail= M()->table('publicity_content')->where($map)->select();
        if(!$detail){
            $detail=array();
        }
        print_r($detail);
    }
}