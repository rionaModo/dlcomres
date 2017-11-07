/**
 * Created by riona on 2017/10/15.
 */
$('#sub').click(function(){

     if($('#code-kuang').val()=='') {
        layer.alert('主题不能为空！',
            {title:'信息提示:',
            icon:2}
        );
         return;
     }
    if ($('#inputType').val()=='') {
        layer.alert('类型不能为空！',
            {title:'信息提示:',
                icon:2}
        );
        return;
    }
    if ($('#code-ww').val()=='') {
        layer.alert('内容不能为空！',
            {title:'信息提示:',
                icon:2}
        );
        return;
    }

    $.ajax({
        url:'/Xiaohao/theme_isrepeat.php',
        type:'post',
        dataType:'json',
        data:{theme:$('#code-kuang').val()},
        success:function(data) {
            if(data.status==1){
                layer.alert('主题重复,请重新输入主题！',
                    {title:'信息提示:',
                        icon:2}
                );
            }else if(data.status==0){
                var data={
                    theme:$('#code-kuang').val(),
                    type:$('#inputType').val(),
                    content:$('#code-ww').val()
                }
                $.ajax({
                    url:'/Xiaohao/learn_insert.php',
                    data:data,
                    type:'POST',
                    dataType:'json',
                    contentType:'application/x-www-form-urlencoded',
                    async:true,
                    success:function(response,ste){
                        var data=response.status;
                        if(data==1){
                            layer.alert('主题不能为空！',
                                {title:'信息提示:',
                                    icon:2}
                            );
                        }else if(data==2){
                            layer.alert('类型不能为空！',
                                {title:'信息提示:',
                                    icon:2}
                            );
                        }else if(data==3){
                            layer.alert('内容不能为空！',
                                {title:'信息提示:',
                                    icon:2}
                            );
                        }else if(data==0){


                            layer.confirm('保存成功!',
                                {
                                    title:'信息提示:',
                                    icon:1,
                                    btn: ['确定'] //可以无限个按钮
                                },
                                function(index, layero){
                                    op();
                                }
                            );

                        }


                        /* if(data.status==1){
                         alert('内容不能为空！')
                         }*/

                    }
                })
            }
        }
    })



})
function op(){
    window.location.href="http://localhost:9900/Xiaohao/learn_list.html";
}


function test(a,b,c){}
test(1,2,3);
var  obj={
    url: '/Xiaohao/learn_insert.php',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded',
    async: true,
    success: function (response, status) {
        var data = response;


    }
};
$.ajax(obj)



//参数为当前页
ajaxTest(1);

function ajaxTest(num) {
    $.ajax({
        url: "table.json",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            console.log(data);
            //分页
            $("#page").paging({
                pageNo: num,
                totalPage: data.totalPage,
                totalSize: data.totalSize,
                callback: function(num) {
                    ajaxTest(num)
                }
            })
        }
    })
}










