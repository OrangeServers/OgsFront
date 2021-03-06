//JavaScript代码区域
layui.use('table', function () {
    var table = layui.table;
    var laydate = layui.laydate;

    get_user_auth_list('audit-userlog')

    //第一个实例
    function get_login_logs(url, obj) {
        table.render({
            id: 'testReload'
            , elem: '#test'
            , height: 550
            , url: url
            , method: 'POST'
            , where: {'login_jg_date': obj}
            , parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": '', //解析提示文本
                    "count": res.login_len_msg, //解析数据长度
                    "data": res.login_list_msg //解析数据列表
                };
            }
            , cols: [[
                {type: 'checkbox', fixed: 'left'}
                , {field: 'login_name', title: '登录用户'}
                , {field: 'login_nw_ip', width: 140, title: '内网ip'}
                , {field: 'login_gw_ip', width: 140, title: '公网ip'}
                , {field: 'login_gw_cs', width: 120, title: '登录地址'}
                , {field: 'login_agent', width: 240, title: '登录设备'}
                , {field: 'login_status', width: 60, title: '状态'}
                , {field: 'login_reason', width: 140, title: '原因'}
                , {field: 'login_time', width: 160, title: '登录时间', sort: true}
                // ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width: 80}
            ]]
            , page: true //开启分页
            , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                title: '提示'
                , layEvent: 'LAYTABLE_TIPS'
                , icon: 'layui-icon-tips'
            }]
            , title: '登录日志表'
        });
    }

    get_login_logs(ogs_backend_url + '/account/login/logs', null)

    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        }
        ;
    });

    //日期时间范围
    function login_date_select() {
        laydate.render({
            elem: '#test10'
            , type: 'datetime'
            , range: true
            , done: function (value, date, endDate) {
                console.log(value); //得到日期生成的值，如：2017-08-18
                console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                if (value === '') {
                    get_login_logs(ogs_backend_url + '/account/login/logs', null)
                } else {
                    get_login_logs(ogs_backend_url + '/account/login/date', value)
                }
            }
        });
    }

    login_date_select()

    // 回车触发搜索事件
    $('#demoReload').bind('keydown', function (event) {
        var event = window.event || arguments.callee.caller.arguments[0];
        if (event.keyCode === 13) {
            let select_val = $('#demoReload').val()
            if (select_val === '') {
                get_login_logs(ogs_backend_url + '/account/login/logs', null)
            } else {
                get_login_logs(ogs_backend_url + '/account/login/select', select_val)
            }
        }
    })


    $('.demoTable .layui-btn').on('click', function () {
        let select_val = $('#demoReload').val()
        if (select_val === '') {
            get_login_logs(ogs_backend_url + '/account/login/logs', null)
        } else {
            get_login_logs(ogs_backend_url + '/account/login/select', select_val)
        }
    })

});

function host_del(obj) {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/account/group/del",
        data: {
            'id': obj
        },
        dataType: "JSON",
        success: function (res) {
            location.reload()
        }
    })
}
