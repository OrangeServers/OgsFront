function get_server_group() {
    let acc_group_id = getParam("id");
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/host/group/list",
        data: {'id': acc_group_id},
        dataType: "JSON",
        success: function (res) {
            if (res['code'] === 0) {
                $("input[name = 'id']").val(res["id"])
                $("input[name = 'name']").val(res["name"])
                $("input[name = 'nums']").val(res['nums'])
                $("input[name = 'remarks']").val(res["remarks"])
            } else if (res['code'] === 201) {
                layer.alert('更新失败，数据获取接口错误', {skin: 'layui-layer-hui'})
            }
        }
    })
}

function acc_server_update() {
    // layer.alert($('.layui-form').serialize())
    let logif = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let data = $('.layui-form').serialize() + "&cz_name=" + $.cookie('username')
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/host/group/update",
        data: data,
        dataType: "JSON",
        success: function (res) {
            if (res['code'] === 0) {
                window.location.href = '/property/property-grouplist.html'
            } else if (res['code'] === 2) {
                layer.close(logif)
                layer.alert('更新失败，内部错误', {skin: 'layui-layer-hui'})
            }
        }
    })
}


layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    get_user_auth_list('property-grouplist')

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        acc_server_update()
    });
});

$(function () {
    get_server_group()
});
