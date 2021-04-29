layui.use(['tree', 'util', 'upload', 'element', 'layer'], function () {
    let tree = layui.tree
        , $ = layui.jquery
        , upload = layui.upload
        , element = layui.element
        , layer = layui.layer
        , util = layui.util;

    //开启复选框
    get_tree_list()

// let id_data = ''
//     console.log(id_data)

    // 按钮事件
    util.event('lay-demo', {
        resetMsg: function (othis) {
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

    //拖拽上传
    function test_put_file(obj, tree_len) {
        if (tree_len === 0) {
            layer.msg('必须选择资产组或资产才能执行', {icon: 7});
        } else {
            $.ajax({
                url: 'http://10.0.1.198:18000/local/file',
                type: 'POST',
                dataType: "JSON",
                // async: false,
                data: obj,		//上传到后台的文件
                processData: false,	// 告诉jQuery不要去处理发送的数据
                contentType: false,	// 告诉jQuery不要去设置Content-Type请求头
                success: function (res) {
                    if (res['code'] === 0) {
                        console.log('导入成功')
                    } else {
                        console.log('导入失败')
                    }
                }
            })
        }
    }

    var dp = document.getElementById('drop_area');
    dp.addEventListener('dragover', function (e) {
        e.stopPropagation();
        //阻止浏览器默认打开文件的操作
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    //单图上传
    dp.addEventListener("drop", function (e) {
        e.stopPropagation();
        //阻止浏览器默认打开文件的操作
        e.preventDefault();
        let div_files = e.dataTransfer.files;
        let div_file = div_files[0];
        let divData = new FormData();
        let div_filename = div_file.name
        divData.append("file", div_file);
        divData.append('name', div_filename);
        divData.append('title', 'divdata');
        let div_tr = $([
          '<p>区域继续拖拽或点击上传脚本可覆盖原文件</p>' + '<table class="layui-table">'
          ,'<tbody id="demoList">'
          ,'<tr>'
          ,'<td>'+ "文件名: " + div_file.name + '</td>'
          ,'<td>'+ "大小: " + (div_file.size/1024).toFixed(1) +'kb </td>'
          ,'<td>状态: 等待上传</td>'
          ,'</tr>' + '</tbody>' + '</table>'
          ].join(''))
        $('#orange-text').css({"margin-top": "10px!;!important;"})
        $('#orange-text').html(div_tr)
        $("#test9").click(function () {
            let checkedData = layui.tree.getChecked('demoId1'); //获取选中节点的数据
            let chk_data_len = checkedData.length
            test_put_file(divData, chk_data_len)
            console.log('div' + div_filename)
        })
    });

    $("#uploadFile").bind('change', function () {
        let formData = new FormData()
        let ipu_file = $("#uploadFile")[0].files[0]
        formData.append('file', ipu_file)
        formData.append('name', ipu_file.name)
        let ipu_tr = $([
          '<p>区域继续拖拽或点击上传脚本可覆盖原文件</p>' + '<table class="layui-table">'
          ,'<tbody id="demoList">'
          ,'<tr>'
          ,'<td>'+ "文件名: " + ipu_file.name + '</td>'
          ,'<td>'+ "大小: " + (ipu_file.size/1024).toFixed(1) +'kb </td>'
          ,'<td>状态: 等待上传</td>'
          ,'</tr>' + '</tbody>' + '</table>'
          ].join(''))
        $('.text').html(ipu_tr)
        $("#test9").click(function () {
            let checkedData = layui.tree.getChecked('demoId1');
            let chk_data_len = checkedData.length
            console.log('div' + ipu_file.name)
            test_put_file(formData, chk_data_len)
        })
    })


// upload_sh_put()

})