//JavaScript代码区域
layui.use('table', function () {
    var table = layui.table;
    var laydate = layui.laydate;

    get_user_auth_list('audit-czlog')

    //第一个实例
    function get_cz_logs(url, obj) {
        table.render({
            id: 'testReload'
            , elem: '#test'
            , height: 550
            , url: url
            , method: 'POST'
            , where: {'cz_jg_date': obj}
            , parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.host_status, //解析接口状态
                    "msg": '', //解析提示文本
                    "count": res.cz_len_msg, //解析数据长度
                    "data": res.cz_list_msg //解析数据列表
                };
            }
            , cols: [[
                {type: 'checkbox', fixed: 'left'}
                , {field: 'cz_name', width:160, title: '登录用户'}
                , {field: 'cz_type', width: 140, title: '操作类型'}
                , {field: 'cz_info', width: 160, title: '操作详情'}
                , {field: 'cz_details', title: '操作细节'}
                , {field: 'cz_status', width: 60, title: '状态'}
                , {field: 'cz_reason', width: 160 ,title: '原因'}
                , {field: 'cz_time', width: 160, title: '操作时间'}
                // ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width: 80}
            ]]
            , page: true //开启分页
            , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                title: '提示'
                , layEvent: 'LAYTABLE_TIPS'
                , icon: 'layui-icon-tips'
            }]
            , title: '操作日志表'
        });
    }

    get_cz_logs(ogs_backend_url + '/server/cz/logs', null)


    //日期时间范围
    function cz_date_select() {
        laydate.render({
            elem: '#test10'
            , type: 'datetime'
            , range: true
            , done: function (value, date, endDate) {
                console.log(value); //得到日期生成的值，如：2017-08-18
                console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                if (value === '') {
                    get_cz_logs(ogs_backend_url + '/server/cz/logs', null)
                } else {
                    get_cz_logs(ogs_backend_url + '/server/cz/date', value)
                }
            }
        });
    }

    cz_date_select()

    // 回车触发搜索事件
    $('#demoReload').bind('keydown', function (event) {
        var event = window.event || arguments.callee.caller.arguments[0];
        if (event.keyCode === 13) {
            let select_val = $('#demoReload').val()
            if (select_val === '') {
                get_cz_logs(ogs_backend_url + '/server/cz/logs', null)
            } else {
                get_cz_logs(ogs_backend_url + '/server/cz/select', select_val)
            }
        }
    })


    $('.demoTable .layui-btn').on('click', function () {
        let select_val = $('#demoReload').val()
        if (select_val === '') {
            get_cz_logs(ogs_backend_url + '/server/cz/logs', null)
        } else {
            get_cz_logs(ogs_backend_url + '/server/cz/select', select_val)
        }
    })

});
