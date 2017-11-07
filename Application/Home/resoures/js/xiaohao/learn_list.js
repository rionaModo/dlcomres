

function open1(){
    window.location.href="/Xiaohao/create.html";
}

function getList(data,call){
    var datap=data;
    $.ajax({
        url:'/Xiaohao/create_list.php',
        type:'get',
        data:datap,
        dataType:'json',
        async:true,
        success:function(response,status){

            var obj={
                contentId:'page',
                pageSize:10,//每页的条数，默认20
                loading:function(obj){
                    var req= {
                        theme:$('#code-zhuti').val(),
                        type:$('#code-leix').val(),
                        p:obj.pageCurrent
                    }
                    getList(req)


                },//当前页改变后的回调，入参为分页信息
                pageList:response.total,//数据的总条数.默认0
                pageCurrent:(datap&&datap.p?datap.p:1)  //当前页，默认1
            }
            new dlPage(obj)


            var data=response.data_list;
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
                    +'<td style="color:#35b5eb" class="shanchu" ><span style="margin: 0px 75px 0px 0px" onclick="deleteInfo(\''+list.id+'\') ">删除</span><a href="/Xiaohao/dgb.html?id='+list.id+'" style="text-decoration: none" onclick="edit(\''+list.id+'\')">修改</a></td>'
                    +'</tr>';
            }
            $('#insertHTML').html(html);
            if(call){
                call(response);
            }
        }
    })
}
function ope(){
   /* if($('#code-zhuti').val()=='') {
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
    }     else if ($('#code-ww'.val()=='')&&$('#code-leix'.val()=='')) {
        return;
    }

*/


    var data= {
        theme:$('#code-zhuti').val(),
        type:$('#code-leix').val(),
    }

    getList(data)

   /* $.ajax({
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
    })*/
}

getList({});


/*$('#page').pagination({
    pageCount: 50,
    jump: true,
    callback:function(api,index){
        var nowPage=api.getCurrent();
        var data= {
            theme:$('#code-zhuti').val(),
            type:$('#code-leix').val(),
            p:nowPage
        }
        getList(data);

    }
});*/




/*function(){
    var head = '<thead><tr>' +
        '<th>id</th>' +
        '<th>主题</th>' +
        '<th>类型</th>' +
        '<th>内容</th>' +
        '<th style="color:#35b5eb">操作</th>' + '' +
        '</tr></thead><tbody>';
    var pageData = [];

    for (var i = 0; i < 100; i++) {
        var list =
        var data = '<tr id="tr_' + list.id + '">' + '<td>' + (i + 1) + '</td>'
            + '<td>' + list.theme + '</td>'
            + '<td>' + list.type + '</td>'
            + '<td>' + list.content + '</td>'
            + '<td style="color:#35b5eb" class="shanchu" onclick="deleteInfo(\'' + list.id + '\') ">删除</td>'
            + '</tr>';
        pageData.push(data);
    }
    var end = '</tbody>';
    $(function () {
        var Count = pageData.length;
        var PageSize = 10;
        var PageCount = Math.ceil(Count / PageSize);
        var currentPage = 1;
        for (var i = 1; i <= PageCount; i++) {
            var pageN = '<a href="#" selectPage="' + i + '" >第' + i + '页</a>';
            $('#page').append(pageN);
        }
        $('#table').empty().append(head);
        for (i = (currentPage - 1) * PageSize; i < PageSize * currentPage; i++) {
            $('#table').append(pageData[i]);
        }
        $('#table').append(end);

        $('a').click(function () {
            var selectPage = $(this).attr('selectPage');
            $('#table').html('');
            for (i = (selectPage - 1) * PageSize; i < PageSize * selectPage; i++) {
                $('#table').append(pageData[i]);
            }
            $('#table').append(end);
        });
    });
}*/




function deleteInfo(id) {
        layer.confirm('你确定删除?',
        {icon: 3,
            title:'提示'}),
    function(){
        $.ajax({
            url:'/Xiaohao/create_list.php',
            type:'get',
            dataType:'json',
            data:{t:Math.random()},
            success:function(data) {
                if(data.status==0){
                    layer.close(index);
                    window.location.reload();
                }else{
                    layer.close(index);
                    layer.msg('删除失败！', {icon: 1});
                }

            }
        })
    }, function() {
            return true;
        }
       /* if(con){
            $.ajax({
                url: '/Xiaohao/learn_delete.php',
                type: 'POST',
                data: {id: id},
                dataType: 'text',

                success:function() {
                    window.location.reload();
                }
            });
        }*/
}

function edit() {
    var data= {
        theme: $('#code-kuang').val(),
        type: $('#inputType').val(),
        content: $('#code-ww').val(),
        id: ''
    }
        $.ajax({
            url: '/Xiaohao/create_list.php',
            type: 'get',
            dataType: 'json',
            data: data,
            success:function ww(response, status) {
                    var data = response.status;
                    if (data == 1) {
                        layer.alert('主题不能为空！',
                            {
                                title: '信息提示:',
                                icon: 2
                            }
                        );
                    } else if (data == 2) {
                        layer.alert('类型不能为空！',
                            {
                                title: '信息提示:',
                                icon: 2
                            }
                        );
                    } else if (data == 3) {
                        layer.alert('内容不能为空！',
                            {
                                title: '信息提示:',
                                icon: 2
                            }
                        );
                    } else if (data == 4) {
                        layer.alert('id不能为空！',
                            {
                                title: '信息提示:',
                                icon: 2
                            }
                        );
                    } else if (data == 0) {


                        layer.confirm('保存成功!',
                            {
                                title: '信息提示:',
                                icon: 1,
                                btn: ['确定'],
                            }
                        )
                    }

            }
        })
    }



   /* $.ajax({
        url:'/Xiaohao/create_list.php',
        type:'get',
        dataType:'json',
        data:{t:Math.random()},
        success:function(data) {
            if(data.status==0){
                layer.close(index);
                window.location.reload();
            }else{
                layer.close(index);
                layer.msg('删除失败！', {icon: 1});
            }

        }
    })*/
/*function ww(response, status) {
    var data = response.status;
    if (data == 1) {
        layer.alert('主题不能为空！',
            {
                title: '信息提示:',
                icon: 2
            }
        );
    } else if (data == 2) {
        layer.alert('类型不能为空！',
            {
                title: '信息提示:',
                icon: 2
            }
        );
    } else if (data == 3) {
        layer.alert('内容不能为空！',
            {
                title: '信息提示:',
                icon: 2
            }
        );
    } else if (data == 4) {
        layer.alert('id不能为空！',
            {
                title: '信息提示:',
                icon: 2
            }
        );
    } else if (data == 0) {


        layer.confirm('保存成功!',
            {
                title: '信息提示:',
                icon: 1,
                btn: ['确定'],
            }
        )
    }
    ;
}*/