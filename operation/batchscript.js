layui.use(['tree', 'util', 'upload', 'element', 'layer'], function () {
    let tree = layui.tree
        , $ = layui.jquery
        , upload = layui.upload
        , element = layui.element
        , layer = layui.layer
        , util = layui.util;

    //开启复选框
    get_tree_list()
    $('#orange-text').css({"margin-top": "10px!;"})

// let id_data = ''
//     console.log(id_data)

    // 点击执行完清除原来样式bug，按钮修改成点击获取两个元素

    // 按钮事件
    util.event('lay-demo', {
        getChecked: function (othis) {
        let formData = new FormData()
        let ipu_file = $("#uploadFile")[0].files[0]
        let checkedData = layui.tree.getChecked('demoId1');
        let chk_data_len = checkedData.length
        if (chk_data_len === 0) {
            layer.msg('必须选择资产组或资产才能执行', {icon: 7});
        } else if(ipu_file === undefined){
            layer.msg('必须上传文件才能执行', {icon: 7})
        } else if (chk_data_len !== 0 && ipu_file !== undefined){
            formData.append('file', ipu_file)
            formData.append('name', ipu_file.name)
            console.log('div' + ipu_file.name)
            test_put_file(formData, undata(checkedData))
        }
        }
        , resetMsg: function () {
            $("#shuru_tex").val("")
        }
        , createHost: function () {
            window.location.href = '../../property/property-hostlist/create.html'
        }
        , createGroup: function () {
            window.location.href = '../../property/property-group/create.html'
        }
        , reload: function () {
            //重载实例
            tree.reload('demoId1', {});

        }
    });

    // 拖拽上传
    function test_put_file(obj, id_list) {
        // if (tree_len === 0) {
        //     layer.msg('必须选择资产组或资产才能执行', {icon: 7});
        // } else {
            let logif = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
            for (let y=0;y<id_list.length;y++){
                obj.append('id_list', id_list[y])
            }
            $.ajax({
                url: 'http://10.0.1.198:18000/server/file/put',
                type: 'POST',
                dataType: "JSON",
                // async: false,
                data: obj,		//上传到后台的文件
                processData: false,	// 告诉jQuery不要去处理发送的数据
                contentType: false,	// 告诉jQuery不要去设置Content-Type请求头
                traditional: true,
                success: function (res) {
                    console.log(res)
                    if (res["server_ping_status"] === 'true') {
                        layer.close(logif)
                        layer.msg('批量执行完成', {icon: 1})
                        var com_ls = res["command_msg"]
                        var com_hs = res["hostname_list"]
                        var com_msg = ''
                        var com_host = ''
                        var com_jh = ''
                        for (var i = 0; i < com_ls.length; i++) {
                            com_msg = com_ls[i] + '\n'
                            for (var y = 0; y <= i; y++) {
                                com_host = com_hs[y] + '  // 机器执行结果 // :' + '\n'
                            }
                            com_jh += com_host + com_msg
                        }
                        $("#shuchu_tex").html('批量命令执行结果' + '\n' + '\n' + com_jh).css({
                            "color": "#FF8C00",
                            "font-size": "10px"
                        })
                        layui.tree.reload('demoId1', {});
                        $(".orange-file-zt").html('状态: 已上传执行')
                    } else if (res["server_ping_status"] === 'fail') {
                        layer.close(logif)
                        layer.msg('批量执行失败', {icon: 2})
                    }
                }
            })
        // }
    }

    // var dp = document.getElementById('drop_area');
    // dp.addEventListener('dragover', function (e) {
    //     e.stopPropagation();
    //     //阻止浏览器默认打开文件的操作
    //     e.preventDefault();
    //     e.dataTransfer.dropEffect = 'copy';
    // });
    //单图上传
    // dp.addEventListener("drop", function (e) {
    //     e.stopPropagation();
    //     //阻止浏览器默认打开文件的操作
    //     e.preventDefault();
    //     let div_files = e.dataTransfer.files;
    //     let div_file = div_files[0];
    //     let divData = new FormData();
    //     let div_filename = div_file.name
    //     divData.append("file", div_file);
    //     divData.append('name', div_filename);
    //     divData.append('title', 'divdata');
    //     let div_tr = $([
    //         '<p>区域继续拖拽或点击上传脚本可覆盖原文件</p>' + '<table class="layui-table">'
    //         , '<tbody id="demoList">'
    //         , '<tr>'
    //         , '<td>' + "文件名: " + div_file.name + '</td>'
    //         , '<td>' + "大小: " + (div_file.size / 1024).toFixed(1) + 'kb </td>'
    //         , '<td>状态: 等待上传</td>'
    //         , '</tr>' + '</tbody>' + '</table>'
    //     ].join(''))
    //     $('.text').html(div_tr)
    //     $("#test9").click(function () {
    //         let checkedData = layui.tree.getChecked('demoId1'); //获取选中节点的数据
    //         let chk_data_len = checkedData.length
    //         console.log('div' + div_filename + chk_data_len)
    //         test_put_file(divData, chk_data_len, undata(checkedData))
    //     })
    // });

    $("#uploadFile").bind('change', function () {
        let formData = new FormData()
        let ipu_file = $("#uploadFile")[0].files[0]
        formData.append('file', ipu_file)
        formData.append('name', ipu_file.name)
        let ipu_tr = $([
            '<p>区域继续拖拽或点击上传脚本可覆盖原文件</p>' + '<table class="layui-table">'
            , '<tbody id="demoList">'
            , '<tr>'
            , '<td>' + "文件名: " + ipu_file.name + '</td>'
            , '<td>' + "大小: " + (ipu_file.size / 1024).toFixed(1) + 'kb </td>'
            , '<td class="orange-file-zt">状态: 等待上传</td>'
            , '</tr>' + '</tbody>' + '</table>'
        ].join(''))
        $('.text').html(ipu_tr)
    })


// upload_sh_put()

})