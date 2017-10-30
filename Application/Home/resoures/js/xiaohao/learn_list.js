

function open1(){
    window.location.href="/Xiaohao/create.html";
}

$.ajax({
    url:'/Xiaohao/create_list.php',
    type:'POST',
    dataType:'json',
    data:{t:Math.random()},
    contentType:'application/x-www-form-urlencoded',
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
            html=html+' <tr>'+'<td>'+(i+1)+'</td>'
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

    $.ajax({
        url: '/Xiaohao/create_delete.php',
        type: 'POST',
        data: {id: id},
        dataType: 'text',
        success:function(fsdkd,sffsx) {
            var da =fsdkd ;
            var html = '';
            for (var i = 0; i < da.length; i++) {
                var list = da[i];
            }
        }
    });
}