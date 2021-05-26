function add_acc_user() {
  // layer.alert($('.layui-form').serialize())
       var logif = layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
    $.ajax({
    type: "POST",
    url: "http://10.0.1.198:18000/server/acc/user/add",
    data: $('.layui-form').serialize(),
    dataType: "JSON",
    success: function (res) {
        if (res['acc_user_add_status'] === 'true') {
            window.location.href = '../user-userlist.html'
        } else if (res['acc_user_add_status'] === 'fail') {
          layer.close(logif)
          layer.alert('添加失败，密码或其他错误')
        } else if (res['acc_user_add_status'] === 'con_fail') {
          layer.close(logif)
          layer.alert('添加失败，主机无法连接')
        } else if (res['acc_user_add_status'] === 'sel_fail') {
          layer.close(logif)
          layer.alert('添加失败，该用户已存在')
        }
    }
    })
}
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  get_user_auth_list('user-userlist')

  //日期
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });
    form.on('submit(demo1)', function(){
      add_acc_user()
    });
});

