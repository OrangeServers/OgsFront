function chk_username() {
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
                if (res['chk_user_status'] === 'true') {
                    layer.msg('该用户名可用', {icon: 1})
                } else if (res['chk_user_status'] === 'fail') {
                    layer.msg('该用户名已存在', {icon: 2})
                }
            }
        })
    }
}

function send_mail(thisBtn) {
    let user_val = $("#email").val()
    if (user_val === '') {
        layer.msg('未输入邮箱', {icon: 3})
    } else {
        // 重置获取验证码按钮
        function out_verification_time() {
            var clock = '';
            var nums = 60;
            var btn;
            btn = thisBtn;
            btn.disabled = true; //将按钮置为不可点击
            btn.innerHTML = nums + '秒后可重新获取';
            clock = setInterval(doLoop, 1000); //一秒执行一次
            function doLoop() {
                nums--;
                if (nums > 0) {
                    btn.innerHTML = nums + '秒后可重新获取';
                } else {
                    clearInterval(clock); //清除js定时器
                    btn.disabled = false;
                    btn.innerHTML = '获取验证码';
                    nums = 10; //重置时间
                }
            }
        }

        $.ajax({
            type: "POST",
            url: "http://10.0.1.198:18000/mail/send_user_mail",
            data: {
                'email': user_val,
            },
            dataType: "JSON",
            success: function (res) {
                if (res['send_status'] === 'true') {
                    layer.msg('发送成功', {icon: 1})
                    out_verification_time()
                } else {
                    layer.msg('该邮箱已被注册', {icon: 2})
                }
            }

        })
    }
}

function com_register() {
    $.ajax({
        type: "POST",
        url: "http://10.0.1.198:18000/account/com_register",
        data: $(".layui-form").serialize(),
        dataType: "JSON",
        success: function (res) {
            console.log(res);
            if (res['chk_user_status'] === 'fail') {
                layer.msg('该用户名已存在,请检查后再试', {icon: 2})
            } else if (res['verification'] === 'fail') {
                layer.msg('验证码错误，请检查后再试', {icon: 2})
            } else if (res['chk_mail_status'] === 'fail') {
                layer.msg('邮箱已被注册，请检查后再试', {icon: 2})
            } else if (res['chk_verification'] === 'fail') {
                layer.msg('验证码已过期，请重新获取', {icon: 2})
            } else if (res['chk_user_status'] === 'true' && res['chk_mail_status'] === 'true' && res['verification'] === 'true') {
                layer.msg('注册成功', {icon: 1})
                window.location.href = "../login.html"
            }
        }
    })
}

var foo = function (element) {
    var intent = document.querySelector(element)
    intent.disabled = 'disabled'
    setTimeout(function () {
        intent.disabled = ''
    }, 30000) /* 可以把 3000 改成自定义的时间*/
    console.log('30 秒内不可以重复点击')
}


var bar = function (fun, select) {
    var intent = document.querySelector('#check_name')
    intent.addEventListener('click', function () {
        fun(select)
    })
}

layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    //日期
    console.log($().cookie)
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        com_register()
    });
});