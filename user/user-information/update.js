layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    get_user_auth_list('')

    let user_name = $.cookie('username')
    get_user_info('user_info', user_name)

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
        user_info_update()
    });
});

// $(function () {
//     get_user_info()
// });
