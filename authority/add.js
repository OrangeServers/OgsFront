layui.use(['form', 'layedit', 'laydate', 'jquery', 'xmSelect'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;

    get_user_auth_list('authority')

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/list",
        data: {
            'req_type': 'user'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            window.demo1 = xmSelect.render({
                el: '#orange-xmsel1',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                name: 'user',
                layVerType: 'msg',
                data: auth_data
            })
        }
    })

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/list",
        data: {
            'req_type': 'user_group'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            window.demo2 = xmSelect.render({
                el: '#orange-xmsel2',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                layVerType: 'msg',
                name: 'user_group',
                data: auth_data
            })
        }
    })

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/list",
        data: {
            'req_type': 'host_group'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            window.demo3 = xmSelect.render({
                el: '#orange-xmsel3',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                name: 'host_group',
                layVerType: 'msg',
                data: auth_data
            })
        }
    })

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/list",
        data: {
            'req_type': 'sys_user'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            window.demo3 = xmSelect.render({
                el: '#orange-xmsel4',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                name: 'sys_user',
                layVerType: 'msg',
                data: auth_data
            })
        }
    })

    let xmSelect = layui.xmSelect

    function add_auth_list() {
        // layer.alert($('.layui-form').serialize())
        var logif = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/auth/host/add",
            // data: {
            //     'name': $("input[name = 'name").val(),
            //     'user': window.demo1.getValue('value'),
            //     'user_group': window.demo2.getValue('value'),
            //     'host_group': window.demo3.getValue('value'),
            //     'remarks': $("input[name = 'remarks").val(),
            // },
            data: $('.layui-form').serialize(),
            traditional: true,
            dataType: "JSON",
            success: function (res) {
                if (res['code'] === 0) {
                    window.location.href = '/authority/authority.html'
                } else if (res['code'] === 2) {
                    layer.close(logif)
                    layer.alert('创建失败，未知错误')
                } else if (res['code'] === 201) {
                    layer.close(logif)
                    layer.alert('创建失败，无法连接')
                } else if (res['code'] === 132) {
                    layer.close(logif)
                    layer.alert('创建失败，该权限名已存在')
                }
            }
        })
    }

    // document.getElementById('demo1-getValue').onclick = function(){
    //     //获取当前多选选中的值
    //     var selectArr = demo1.getValue('value');
    //     document.getElementById('demo1-value').innerHTML = JSON.stringify(selectArr, null, 2);
    // }

    form.on('submit(demo1)', function () {
        let msg = $(".layui-form").serialize()
        console.log(msg)
        add_auth_list()
    });
})