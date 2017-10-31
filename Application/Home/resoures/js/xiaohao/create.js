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
else if ($('#inputType').val()=='') {
        layer.alert('类型不能为空！',
            {title:'信息提示:',
                icon:2}
        );
         return;
     }
     else if ($('#code-ww').val()=='') {
         layer.alert('内容不能为空！',
             {title:'信息提示:',
                 icon:2}
         );
         return;
     }

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
        success:function(response,status){
            var data=response;
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
var p= {
        btn: ['按钮一', '按钮二', '按钮三'] //可以无限个按钮
        ,btn3: function(index, layero){
            //按钮【按钮三】的回调
        }
    };
layer.confirm('纳尼？',p, function(index, layero){
    //按钮【按钮一】的回调
}, function(index){
    //按钮【按钮二】的回调
});
