function add_acc_user() {
    // layer.alert($('.layui-form').serialize())
    var logif = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let data = $('.layui-form').serialize() + "&cz_name=" + $.cookie('username')


    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/account/user/add",
        data: data,
        dataType: "JSON",
        success: function (res) {
            if (res['code'] === 0) {
                window.location.href = '/user/user-userlist.html'
            } else if (res['code'] === 2) {
                layer.close(logif)
                layer.alert('添加失败，内部错误')
            } else if (res['code'] === 201) {
                layer.close(logif)
                layer.alert('添加失败，数据获取接口错误')
            } else if (res['code'] === 111) {
                layer.close(logif)
                layer.alert('添加失败，该用户已存在')
            }
        }
    })
}

layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    get_user_auth_list('user-userlist')

    get_group_name_list('/account/group/name_list')

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        add_acc_user()
    });
});

