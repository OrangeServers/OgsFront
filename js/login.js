function user_login() {
  // layer.alert($('.layui-form').serialize())
       var logif = layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
    $.ajax({
    type: "POST",
    url: "http://10.0.1.198:18000/account/login_dl",
    data: $('.layui-form').serialize(),
    dataType: "JSON",
    success: function (res) {
        if (res['chk_status'] === 'true') {
            window.location.href = '../index.html'
            $.cookie('username',$("#orange-username").val(),{expires:1});
        } else if (res['password_status'] === 'fail') {
          layer.close(logif)
          layer.alert('登录失败，密码或其他错误')
        } else if (res['user_status'] === 'fail') {
          layer.close(logif)
          layer.alert('登录失败，用户名不存在')
        }
    }
    })
}

layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  //日期
    console.log($().cookie)
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });
    form.on('submit(demo1)', function(){
      user_login()
    });
});