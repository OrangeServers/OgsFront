layui.use('table', function () {
    var table = layui.table;

    get_user_auth_list('cron')

    //第一个实例
    let cron_tab = table.render({
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
            , {field: 'id', width: 50, title: 'id'}
            , {field: 'job_name', title: '任务名'}
            , {field: 'job_minute', width: 50, title: '分'}
            , {field: 'job_hour', width: 50, title: '时'}
            , {field: 'job_day', width: 50, title: '日'}
            , {field: 'job_month', width: 50, title: '月'}
            , {field: 'job_week', width: 50, title: '周'}
            , {field: 'job_hosts', title: '资产'}
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
                window.location.href = '/cron/create.html'
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
        var job_name = obj.data['job_name']
        if (obj.event === 'del') {
            layer.confirm('确定删除该任务?', function (index) {
                // obj.del();
                console.log(job_name);
                cron_del(job_name)
                layer.close(index);
            });
        } else if (obj.event === 'start') {
            cron_resume(job_name)
        } else if (obj.event === 'stop') {
            cron_pause(job_name)
        }
    });

    function cron_del(obj) {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/cron/del",
            data: {
                'job_name': obj
            },
            dataType: "JSON",
            success: function (res) {
                if (res['cron_del_status'] === 'true') {
                    cron_tab.reload()
                } else if (res['cron_del_status'] === 'fail') {
                    layer.alert('删除失败, 未知错误！')
                }
            }
        })
    }

    function cron_pause(obj) {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/cron/pause",
            data: {
                'job_name': obj
            },
            dataType: "JSON",
            success: function (res) {
                if (res['cron_pause_status'] === 'true') {
                    cron_tab.reload()
                } else if (res['cron_pause_status'] === 'fail') {
                    layer.alert('暂停失败, 未知错误！')
                }
            }
        })
    }

    function cron_resume(obj) {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/cron/resume",
            data: {
                'job_name': obj
            },
            dataType: "JSON",
            success: function (res) {
                if (res['cron_resume_status'] === 'true') {
                    cron_tab.reload()
                } else if (res['cron_resume_status'] === 'fail') {
                    layer.alert('启动失败, 未知错误！')
                }
            }
        })
    }

});