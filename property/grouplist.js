//JavaScript代码区域
layui.use('table', function () {
    let table = layui.table;

    get_user_auth_list('property-grouplist')

    function create_zx() {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/account/user/auth_list",
            dataType: "JSON",
            // async: false,
            success: function (res) {
                let user_auth = res['usrole'],
                    html = '<button class="layui-btn layui-btn-sm" lay-event="createData">创建资产组</button>'
                if (user_auth === 'admin') {
                    $('.orange-crgp').before(html)
                }
            }
        })
    }

    create_zx()

    // 加载组关联资产信息
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/sum",
        data: {
            'sum_name': 'group'
        },
        dataType: "JSON",
        success: function (res) {
        }
    })

    //第一个实例
    let group_tab = table.render({
        id: 'test'
        , elem: '#test'
        , height: 560
        , url: ogs_backend_url + '/server/host/group/list_all'
        , method: 'POST'
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": '', //解析提示文本
                "count": res.group_len_msg, //解析数据长度
                "data": res.group_list_msg //解析数据列表
            };
        }
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', width: 80, sort: true, title: 'id'}
            , {field: 'name', title: '组名'}
            , {field: 'nums', width: 100, title: '资产数量'}
            , {field: 'remarks', title: '备注'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150}
        ]]
        , page: true //开启分页
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            , layEvent: 'LAYTABLE_TIPS'
            , icon: 'layui-icon-tips'
        }]
        , title: '组信息表'
    });


    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：' + data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选' : '未全选');
                break;
            case 'createData':
                window.location.href = '/property/property-group/create.html'
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        }
        ;
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        //console.log(obj)
        if (obj.event === 'del') {
            layer.confirm('确定删除该资产组? 该操作会同时删除组内所有资产 !', function (index) {
                // obj.del();
                var host_id = obj.data['id']
                group_del(host_id)
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            // layer.prompt({
            //   formType: 2
            //   ,value: data.email
            // }, function(value, index){
            //   obj.update({
            //     email: value
            //   });
            //   layer.close(index);
            // });
            window.location.href = "/property/property-group/update.html?id=" + data.id
            // $("input[name = 'alias']")
            // layer.alert(data.id, {skin: 'layui-layer-hui'})
        }
    });

    function group_del(obj) {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/server/host/group/del",
            data: {
                'id': obj
            },
            dataType: "JSON",
            success: function (res) {
                if (res['code'] === 0) {
                    group_tab.reload()
                    create_zx()
                } else if (res['code'] === 111) {
                    layer.alert('删除失败, 未知错误！')
                }
            }
        })
    }
});
