function add_sys_user() {
    // layer.alert($('.layui-form').serialize())
    var logif = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let host_key = $('#host_key')[0].files[0]
    let data = new FormData()
    data.append('host_key', host_key)
    data.append('alias', $("input[name = 'alias']").val())
    data.append('host_user', $("input[name = 'host_user']").val())
    data.append('agreement', $("select[name = 'agreement']").val())
    data.append('host_password', $("input[name = 'host_password']").val())
    data.append('remarks', $("input[name = 'remarks']").val())

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/sys/user/add",
        data: data,
        processData: false,	// 告诉jQuery不要去处理发送的数据
        contentType: false,	// 告诉jQuery不要去设置Content-Type请求头
        traditional: true,
        dataType: "JSON",
        success: function (res) {
            if (res['code'] === 0) {
                window.location.href = '/property/property-userlist.html'
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

    get_user_auth_list('property-userlist')

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        add_sys_user()
    });
});

