layui.use(['form', 'layedit', 'laydate', 'element'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;

    get_user_auth_list('property-hostlist')

    // 获取组名列表
    get_group_name_list('/server/host/group/name_list')

    function host_add(add_type) {
        // layer.alert($('.layui-form').serialize())
        var logif = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        let data = $('.layui-form').serialize() + "&cz_name=" + $.cookie('username')
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/server/host/add",
            data: data,
            dataType: "JSON",
            success: function (res) {
                if (res['code'] === 0) {
                    if (add_type === 'save') {
                        window.location.href = '/property/property-hostlist.html'
                    } else if (add_type === 'save_jx') {
                        layer.close(logif)
                        layer.msg('添加成功', {icon: 1, time: 2000})
                    }
                } else if (res['code'] === 2) {
                    layer.close(logif)
                    layer.alert('添加失败，内部错误')
                } else if (res['code'] === 201) {
                    layer.close(logif)
                    layer.alert('添加失败，数据获取接口错误')
                } else if (res['code'] === 111) {
                    layer.close(logif)
                    layer.alert('添加失败，该主机已存在')
                }
            }
        })
    }

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        host_add('save')
    });

    form.on('submit(demo2)', function () {
        host_add('save_jx')
    });

});