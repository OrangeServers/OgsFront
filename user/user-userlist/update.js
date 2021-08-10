function acc_user_update() {
    // layer.alert($('.layui-form').serialize())
    let logif = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let data = $('.layui-form').serialize() + "&cz_name=" + $.cookie('username')
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/account/user/update",
        data: data,
        dataType: "JSON",
        success: function (res) {
            if (res['acc_user_ping_status'] === 'fail') {
                layer.close(logif)
                layer.alert('更新失败，密码或其他错误，主机无法连接', {skin: 'layui-layer-hui'})
            } else if (res['acc_user_into_update']) {
                window.location.href = '/user/user-userlist.html'
            } else if (res['acc_user_into_update'] === 'fail') {
                layer.close(logif)
                layer.alert('更新失败，未知错误#db error', {skin: 'layui-layer-hui'})
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


    let acc_user_id = getParam("id");
    get_user_info('user_list', acc_user_id)

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        acc_user_update()
    });
});

// $(function () {
//     get_acc_user()
// });
