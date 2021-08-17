layui.use(['form', 'layedit', 'laydate', 'jquery', 'xmSelect'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , username = $.cookie('username');

    get_user_auth_list('cron')

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/cron/auth_list",
        data: {
            'req_type': 'cron_groups',
            'name': username
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            window.demo3 = xmSelect.render({
                el: '#orange-xmsel3',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                name: 'job_groups',
                layVerType: 'msg',
                data: auth_data
            })
        }
    })

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/cron/auth_list",
        data: {
            'req_type': 'cron_hosts',
            'name': username
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            window.demo2 = xmSelect.render({
                el: '#orange-xmsel2',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                name: 'job_hosts',
                layVerType: 'msg',
                data: auth_data
            })
        }
    })

    let xmSelect = layui.xmSelect

    function add_auth_list() {
        // layer.alert($('.layui-form').serialize())
        var logif = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/cron/add",
            data: $('.layui-form').serialize(),
            traditional: true,
            dataType: "JSON",
            success: function (res) {
                if (res['cron_add_status'] === 'true') {
                    window.location.href = '/cron/cron.html'
                } else if (res['cron_add_status'] === 'fail') {
                    layer.close(logif)
                    layer.alert('创建失败，未知错误')
                } else if (res['cron_add_status'] === 'con_fail') {
                    layer.close(logif)
                    layer.alert('创建失败，无法连接')
                } else if (res['cron_add_status'] === 'sel_fail') {
                    layer.close(logif)
                    layer.alert('创建失败，该任务名已存在')
                }
            }
        })
    }


    form.on('submit(demo1)', function () {
        let msg = $(".layui-form").serialize()
        console.log(msg)
        add_auth_list()
    });
})