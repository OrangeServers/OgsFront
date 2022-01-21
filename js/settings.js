layui.use(['form', 'jquery', 'layedit', 'laydate', 'element'], function () {
    let element = layui.element,
        layedit = layui.layedit,
        laydate = layui.laydate,
        form = layui.form;

    get_user_auth_list('settings')


    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/settings/get",
        data: {'name': $.cookie('username')},
        dataType: "JSON",
        success: function (res) {
            $(".orange-sel" + res['login_time']).attr('selected', '')
            $(".orange-ra-" + res['register_status']).attr('checked', '')
            $(".orange-ra-" + res['color_matching']).attr('checked', '')
            form.render()
        }
    })

    function settings_update() {
        let data = $('.layui-form').serialize() + "&name=" + $.cookie('username')
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/settings/update",
            data: data,
            dataType: "JSON",
            success: function (res) {
                if (res['code'] === 0) {
                    layer.msg('应用成功', {icon: 1, time: 2000})
                } else if (res['code'] === 201) {
                    layer.msg('应用失败', {icon: 2, time: 2000})
                }
            }
        })
    }

    //监听指定开关
    form.on('switch(switchTest)', function (data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });

    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        console.log($('.layui-form').serialize())
        settings_update()
    });

})