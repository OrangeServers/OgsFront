function addScript(url){
    document.write("<script language=javascript src='/user/user-userlist/add.js'></script>")
    document.write("<script language=javascript src='/user/user-userlist/update.js'></script>");
}

// function get_acc_user() {
//     let user_name = $.cookie('username')
//     $.ajax({
//         type: "POST",
//         url: ogs_backend_url + "/account/user/list",
//         data: {'user_type': 'user_info', 'name': user_name},
//         dataType: "JSON",
//         success: function (res) {
//             if (res['acc_user_list_msg'] !== 'select list msg error') {
//                 $("input[name = 'alias']").val(res["alias"])
//                 $("input[name = 'id']").val(res["id"])
//                 $("input[name = 'name']").val(res["name"])
//                 $("input[name = 'mail']").val(res['mail'])
//                 $("input[name = 'remarks']").val(res["remarks"])
//             } else {
//                 error('未知错误')
//             }
//         }
//     })
// }
//
// function acc_user_update() {
//     // layer.alert($('.layui-form').serialize())
//     let logif = layer.load(1, {
//         shade: [0.1, '#fff'] //0.1透明度的白色背景
//     });
//     $.ajax({
//         type: "POST",
//         url: ogs_backend_url + "/account/user/update",
//         data: $('.layui-form').serialize(),
//         dataType: "JSON",
//         success: function (res) {
//             if (res['acc_user_ping_status'] === 'fail') {
//                 layer.close(logif)
//                 layer.alert('更新失败，密码或其他错误，主机无法连接', {skin: 'layui-layer-hui'})
//             } else if (res['acc_user_into_update']) {
//                 window.location.href = '/user/user-userlist.html'
//             } else if (res['acc_user_into_update'] === 'fail') {
//                 layer.close(logif)
//                 layer.alert('更新失败，未知错误#db error', {skin: 'layui-layer-hui'})
//             }
//         }
//     })
// }


layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    get_user_auth_list('')


    let user = $.cookie('username')
    let path = ogs_backend_url + '/local/image/test_get/'
    let img_url = path + user
    console.log(user)
    let html = '<label style="float: left; margin-left: 100px; font-size: 25px">更换头像</label>\n' +
        '      <img src=' + img_url + ' class="round_icon">\n' +
        '      <div class="layui-upload" style="margin-left: 450px">\n' +
        '        <button type="button" class="layui-btn" id="test1">选择文件</button>\n' +
        '        <div class="layui-upload-list">\n' +
        '          <img class="layui-upload-img" id="demo1">\n' +
        '          <p id="demoText"></p>\n' +
        '        </div>'
    $('#orange-user-img-update').html(html)

    $.ajax({
        type: "POST",
        url: img_url,
        dataType: "JSON",
        success: function (res) {

        }
    })


    layui.upload.render({
        elem: '#test1'
        , url: ogs_backend_url + '/local/image/test_put' //改成您自己的上传接口
        , data: {
            'user': user
        }
        , accept: 'images'
        , exts: 'jpeg|jpg|png'
        , acceptMime: 'image/*'
        , done: function (res) {
            layer.msg('更换成功');
            console.log(res)
        }
    });

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

$(function () {
    get_acc_user()
});
