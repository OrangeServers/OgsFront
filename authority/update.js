layui.use(['form', 'layedit', 'laydate', 'jquery', 'xmSelect'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , host_name = getParam("name");

    get_user_auth_list('authority')

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/uplist",
        data: {
            'name': host_name,
            'req_type': 'all'
        },
        dataType: "JSON",
        success: function (res) {
            $("input[name = 'name").val(res['name'])
            $("input[name = 'remarks").val(res['remarks'])
        }
    })

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/uplist",
        data: {
            'name': host_name,
            'req_type': 'user'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            for (let i = 0; i < auth_data.length; i++) {
                if (auth_data[i]['selected'] === 'selected') {
                    auth_data[i]['selected'] = true
                }
            }
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
        url: ogs_backend_url + "/auth/host/uplist",
        data: {
            'name': host_name,
            'req_type': 'user_group'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            for (let i = 0; i < auth_data.length; i++) {
                if (auth_data[i]['selected'] === 'selected') {
                    auth_data[i]['selected'] = true
                }
            }
            window.demo1 = xmSelect.render({
                el: '#orange-xmsel2',
                language: 'zn',
                theme: {
                    color: '#f37b1d',
                },
                name: 'user_group',
                layVerType: 'msg',
                data: auth_data
            })
        }
    })

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/auth/host/uplist",
        data: {
            'name': host_name,
            'req_type': 'host_group'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            for (let i = 0; i < auth_data.length; i++) {
                if (auth_data[i]['selected'] === 'selected') {
                    auth_data[i]['selected'] = true
                }
            }
            window.demo1 = xmSelect.render({
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
        url: ogs_backend_url + "/auth/host/uplist",
        data: {
            'name': host_name,
            'req_type': 'sys_user'
        },
        dataType: "JSON",
        success: function (res) {
            let auth_data = res['msg']
            for (let i = 0; i < auth_data.length; i++) {
                if (auth_data[i]['selected'] === 'selected') {
                    auth_data[i]['selected'] = true
                }
            }
            window.demo1 = xmSelect.render({
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

    function auth_host_update() {
        // layer.alert($('.layui-form').serialize())
        let logif = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/auth/host/update",
            data: $('.layui-form').serialize(),
            dataType: "JSON",
            success: function (res) {
                if (res['code'] === 0) {
                    window.location.href = '/authority/authority.html'
                } else if (res['code'] === 2) {
                    layer.close(logif)
                    layer.alert('更新失败，内部错误', {skin: 'layui-layer-hui'})
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
        auth_host_update()
    });
})