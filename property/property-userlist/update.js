function get_sys_user() {
    let sys_user_id = getParam("id");
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/sys/user/list",
        data: {'id': sys_user_id},
        dataType: "JSON",
        success: function (res) {
            if (res['sys_user_list_msg'] !== 'select list msg error') {
                $("input[name = 'id']").val(res["id"])
                $("input[name = 'alias']").val(res["alias"])
                $("input[name = 'nums']").val(res['nums'])
                $("input[name = 'host_user']").val(res["host_user"])
                $("input[name = 'remarks']").val(res["remarks"])
            } else {
                error('未知错误')
            }
        }
    })
}

function sys_user_update() {
    // layer.alert($('.layui-form').serialize())
    let logif = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let data = $('.layui-form').serialize() + "&cz_name=" + $.cookie('username')
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/sys/user/update",
        data: data,
        dataType: "JSON",
        success: function (res) {
            if (res['sys_user_ping_status'] === 'fail') {
                layer.close(logif)
                layer.alert('更新失败，密码或其他错误，主机无法连接', {skin: 'layui-layer-hui'})
            } else if (res['sys_user_into_update']) {
                window.location.href = '/property/property-userlist.html'
            } else if (res['sys_user_into_update'] === 'fail') {
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

    get_user_auth_list('property-userlist')

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        sys_user_update()
    });
});

$(function () {
    get_sys_user()
});
