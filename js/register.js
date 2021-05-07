 function chk_username(){
    let user_val = $("#orange-username").val()
    if (user_val === '') {
        layer.msg('请输入用户名', {icon: 3})
    } else {
    $.ajax({
            type: "POST",
            url: "http://10.0.1.198:18000/account/chk_username",
            data: {
                'username': user_val,
            },
            dataType: "JSON",
            success: function (res) {
                if (res['chk_user_status'] === 'true'){
                    layer.msg('该用户名可用', {icon: 1})
                }else if (res['chk_user_status'] === 'fail'){
                    layer.msg('该用户名已存在', {icon: 2})
                }
            }
    })
  }
 }

 function send_mail() {
    $.ajax({
        type: "POST",
        url: "http://10.0.1.198:18000/mail/send_user_mail",
        data: {
            'email': $("#email").val(),
        },
        dataType: "JSON",
        success: function (res) {
            if (res['send_status'] === 'true'){
                layer.msg('发送成功', {icon: 1})
            }else {
                layer.msg('该邮箱已被注册', {icon: 2})
            }
        }
    })
 }

 function com_register(){
    $.ajax({
                type: "POST",
        url: "http://10.0.1.198:18000/account/com_register",
        data: $("#register_value").serialize(),
        dataType: "JSON",
        success: function (res) {
            console.log(res);
            if (res['chk_user_status'] === 'fail'){
                tc_alert('该用户名已存在,请检查后再试')
            } else if (res['verification'] === 'fail'){
                tc_alert('验证码错误，请检查后再试')
            } else if (res['chk_mail_status'] === 'fail'){
                tc_alert('邮箱已被注册，请检查后再试')
            } else if (res['chk_verification'] === 'fail'){
                tc_alert('验证码已过期，请重新获取')
            } else if (res['chk_user_status'] === 'true' && res['chk_mail_status'] === 'true' && res['verification'] === 'true'){
                success('注册成功')
                window.location.href = "/login"
            }
        }
    })
 }

 var foo = function(element) {
  var intent = document.querySelector(element)
  intent.disabled = 'disabled'
  setTimeout(function() {
    intent.disabled = ''
  }, 30000) /* 可以把 3000 改成自定义的时间*/
  console.log('30 秒内不可以重复点击')
}


var bar = function(fun, select) {
  var intent = document.querySelector('#check_name')
  intent.addEventListener('click', function() {
    fun(select)
  })
}