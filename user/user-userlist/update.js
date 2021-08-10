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
        user_info_update()
    });
});

// $(function () {
//     get_acc_user()
// });
