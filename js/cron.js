layui.use('table', function () {
    var table = layui.table;

    get_user_auth_list('cron')

    //第一个实例
    table.render({
        id: 'test'
        , elem: '#test'
        , height: 520
        , url: ogs_backend_url + '/local/cron/list_all'
        , method: 'POST'
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.host_status, //解析接口状态
                "msg": '', //解析提示文本
                "count": res.cron_len_msg, //解析数据长度
                "data": res.cron_list_msg //解析数据列表
            };
        }
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', width: 60, title: 'id'}
            , {field: 'job_name', title: '任务名'}
            , {field: 'job_minute', width: 60, title: '分'}
            , {field: 'job_hour', width: 60, title: '时'}
            , {field: 'job_day', width: 60, title: '日'}
            , {field: 'job_month', width: 60, title: '月'}
            , {field: 'job_week', width: 60, title: '周'}
            , {field: 'job_groups', title: '资产组'}
            , {field: 'job_command', title: '任务详情'}
            , {field: 'job_status', width: 60, title: '状态'}
            , {field: 'job_remarks', title: '备注'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 170}
        ]]
        , page: true //开启分页
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            , layEvent: 'LAYTABLE_TIPS'
            , icon: 'layui-icon-tips'
        }]
        , title: '定时任务信息表'
    });


    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：' + data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选' : '未全选');
                break;
            case 'createData':
                window.location.href = '/authority/create.html'
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        }
        ;
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        //console.log(obj)
        if (obj.event === 'del') {
            layer.confirm('确定删除该资产?', function (index) {
                // obj.del();
                var host_name = obj.data['name']
                console.log(host_name);
                auth_del(host_name)
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            window.location.href = "/authority/update.html?name=" + data.name
        }
    });
});

function auth_del(obj) {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/del",
        data: {
            'name': obj
        },
        dataType: "JSON",
        success: function (res) {
            location.reload()
        }
    })
}