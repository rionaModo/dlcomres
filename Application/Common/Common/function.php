<?php
function guid()
{
    if (function_exists('com_create_guid')) {
        return com_create_guid();
    } else {
        mt_srand((double)microtime() * 10000);
        $charid = strtolower(md5(uniqid(rand(), true)));
        $hyphen = chr(45); //-,chr(123){ chr(125) }
        $uuid =substr($charid, 0, 8)
            . substr($charid, 8, 4)
            . substr($charid, 12, 4)
            . substr($charid, 16, 4)
            . substr($charid, 20, 12);
        return $uuid;
    }
}
function getPageUrl($page=1,$url){
    return '/Learn/learn_list.html?theme=&type=&p='.$page;
}
/*
 * 分页样式形成
 * param
 * $count 数据总条数
 * $pagesize 每页多少数据
 * $curPage 当前页面
 * */
function getpage($count, $pagesize = 10,$curPage=1) {
    $curPage=(int)$curPage;
    $Page=array();
    $totalpage=$count%$pagesize>0?floor($count/$pagesize)+1:$count/$pagesize;
    $pageCont=array();
    $pageCont['prev']='';
    $pageCont['next']='';
    $pageCont['content']='';
    if($curPage<=5){

        for($i=1;$i<=$curPage;$i++){
            $url=getPageUrl($i);
            if($i==$curPage){
                $pageCont['content']=$pageCont['content']."<li class='active'><a href='$url'>{$i}</a></li>";
            }else{
                $pageCont['content']=$pageCont['content']."<li><a href='$url'>{$i}</a></li>";
            }
        }
    } else {
        $pageCont['prev']="<li><a href='".getPageUrl($curPage-1)."'  aria-label='Previous'><span aria-hidden='true'>«</span> </a></li>";
        $pageCont['content']=$pageCont['content']."<li><a href='{getPageUrl(1)}'>1</a></li>";
        $pageCont['content']=$pageCont['content']."<li class='pagemore'><a>..</a></li>";
        $pageCont['content']=$pageCont['content']."<li><a href='".getPageUrl($curPage-2)."'>".($curPage-2)."</a></li>";
        $pageCont['content']=$pageCont['content']."<li><a href='".getPageUrl($curPage-1)."'>".($curPage-1)."</a></li>";
        $pageCont['content']=$pageCont['content']."<li class='active'><a href='".getPageUrl($curPage)."'>{$curPage}</a></li>";
    }

    if($totalpage-$curPage<=3){
        for($i=$curPage+1;$i<=$totalpage;$i++){
            $pageCont['content']=$pageCont['content']."<li><a href='".getPageUrl($i)."'>{$i}</a></li>";
        }
    } else {
        $pageCont['next']="<li><a href='".getPageUrl($curPage+1)."' aria-label='Next'><span aria-hidden='true'>»</span></a></li>";
        $pageCont['content']=$pageCont['content']."<li><a href='".getPageUrl($curPage+1)."'>".($curPage+1)."</a></li>";
        $pageCont['content']=$pageCont['content']."<li><a href='".getPageUrl($curPage+2)."'>".($curPage+2)."</a></li>";
        $pageCont['content']=$pageCont['content']."<li class='pagemore'><a>..</a></li>";
        $pageCont['content']=$pageCont['content']."<li><a href='{getPageUrl($totalpage)}'>{$totalpage}</a></li>";
    }
    return $pageCont['prev'].$pageCont['content']. $pageCont['next'];
}
