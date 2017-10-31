

function open1(){
    window.location.href="/Xiaohao/create.html";
}


function ope(){
    if($('#code-zhuti').val()=='') {
        layer.alert('主题不能为空！',
            {title:'信息提示:',
                icon:2}
        );
        return;
    }
    else if ($('#code-leix').val()=='') {
        layer.alert('类型不能为空！',
            {title:'信息提示:',
                icon:2}
        );
        return;
    }     else if ($('#code-ww')&&$('#code-leix')) {
        layer.alert('无搜索内容',
            {title:'信息提示:',
                icon:2}
        );
        return;
    }
    var data= {
        theme:$('#code-zhuti').val(),
        type:$('#code-leix').val(),
    }

    $.ajax({
        url: '/Xiaohao/create_list.php',
        type:'get',
        async:true,
        data:data,
        dataType:'json',
        success:function(mse,erf) {
            var da = mse;
            var str='';
            for (var i = 0; i<da.length; i++) {
                var list = da[i];
                var sd = "";
                if (list.type == 1) {
                    sd = "开发流程"
                } else if (list.type == 2) {
                    sd = "测试流程"
                } else if (list.type == 3) {
                    sd = "技术小点"
                } else if (list.type == 4) {
                    sd = "工作心得"
                } else if (list.type == 5) {
                    sd = "生活分享"
                }

                str += "<tr>" +
                    ' <tr id="tr_'+da.id+'">'+'<td>'+(i+1)+'</td>' +
                    "<td>" + da[i].theme + "</td>" +
                    "<td>" + sd + "</td>" +
                    "<td>" + da[i].content + "</td>" +
                    '<td style="color:#35b5eb" class="shanchu" onclick="deleteInfo(\''+list.id+'\') ">删除</td>'
                    "</tr>";
            }
            $("#insertHTML").html(str)
        }
    })
}

$.ajax({
    url:'/Xiaohao/create_list.php',
    type:'get',
    dataType:'json',
    data:{t:Math.random()},
    async:true,
    success:function(response,status){
        var data=response;
        var html='';
        for(var i=0;i<data.length;i++){
            var  list=data[i];

            var ty="";
            if(list.type==1){
                ty="开发流程"
            }else if(list.type==2){
                ty="测试流程"
            }else if(list.type==3){
                ty="技术小点"
            }else if(list.type==4){
                ty="工作心得"
            }else if(list.type==5){
                ty="生活分享"
            }
            html=html+' <tr id="tr_'+list.id+'">'+'<td>'+(i+1)+'</td>'
                +'<td>'+list.theme+'</td>'
                +'<td>'+ty+'</td>'
                +'<td>'+list.content+'</td>'
                +'<td style="color:#35b5eb" class="shanchu" onclick="deleteInfo(\''+list.id+'\') ">删除</td>'
                +'</tr>';
        }
        $('#insertHTML').html(html)
    }
})


function deleteInfo(id) {
        con= layer.confirm('你确定删除?',
        {icon: 3,
            title:'提示'});
        if(con){
            $.ajax({
                url: '/Xiaohao/learn_delete.php',
                type: 'POST',
                data: {id: id},
                dataType: 'text',

                success:function() {
                    window.location.reload();
                }
            });
        }
}