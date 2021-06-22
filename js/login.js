document.write("<script src=\"http://pv.sohu.com/cityjson?ie=utf-8\"></script>")


function draw(show_num) {
    var canvas_width = $('#canvas').width();
    var canvas_height = $('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度

    for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

function randomColor() {//得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}


    function get_new_ondate() {
        let mydata = new Date()
        let day = mydata.getDate();
        let month = mydata.getMonth() + 1;
        let year = mydata.getFullYear();
        if (month < 10) {
        month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return year + '-' + month + '-' + day
    }

function user_login() {
    // layer.alert($('.layui-form').serialize())
    var logif = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let login_form = $.param({'user_gw_ip': returnCitySN["cip"]}) + '&' + $.param({'user_gw_cs': returnCitySN["cname"]}) + '&' + $('.layui-form').serialize()
    console.log(login_form)
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/account/login_dl",
        data: login_form,
        dataType: "JSON",
        success: function (res) {
            if (res['chk_status'] === 'true') {
                window.location.href = '/index.html'
                let date = new Date();
                date.setTime(date.getTime() + 4 * 60 * 60 * 1000);//只能这么写，10表示10秒钟
                $.cookie('username', $("#orange-username").val(), {expires: date});
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

let show_num = [];
$(function () {
    draw(show_num);
    $("#canvas").on('click', function () {
        draw(show_num)
    })
})

layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;


    if ($.cookie('username') !== undefined){
        window.location.href = '/index.html'
    }

    //日期
    console.log($().cookie)
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
    form.on('submit(demo1)', function () {
        let val = $('#orange-yzm').val();
        let num = show_num.join("");
        console.log(val, num)
        if (val !== num) {
            layer.msg('验证码错误', {icon: 5, time: 2000})
            $('#orange-yzm').val('')
            draw(show_num)
        } else if (val === num) {
            user_login()
        }
    });
});

// 测试监听输入事件
function test_on_input() {
    let val = $('#orange-username').val()
    if (val !== 'xuzhiwei') {
        // layer.msg('????', {icon: 5, time: 2000})
        $("#orange-username").css('color', '#4cb450')
    } else if (val === 'xuzhiwei') {
        $("#orange-username").css('color', '')
    }
}