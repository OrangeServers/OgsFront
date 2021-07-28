layui.use(['upload', 'dropdown', 'util', 'layer', 'table', 'element'], function () {
    let element = layui.element,
        upload = layui.upload,
        dropdown = layui.dropdown,
        util = layui.util,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery;

    get_user_auth_list('filetransfer')

    // $("#demo6").dblclick(function (){
    //     layer.msg($(this).val())
    // })

    $(".orange-btn-checkout").on('click', function () {
        if (window.file_ispath === '/') {
            file_render('/')
            layer.msg('已经到根目录了')
        } else {
            file_render(window.file_ispath, 'checkout')
        }
    })

    $(".orange-btn-root").on('click', function () {
        file_render('/')
    })

    // $(".orange-btn-file").on('click', function () {
    //     put_file_render($.cookie('file_ispath'))
    // })

    let put_file = upload.render({
        elem: '#test3'
        , url: ogs_backend_url + "/local/file/put" //改成您自己的上传接口
        , accept: 'file' //普通文件
        , auto: true
        , before: function (obj) {
            element.progress('demo-jdt', '0%'); //进度条复位
        }
        , progress: function (n, elem, res, index) {
            element.progress('demo-jdt', n + '%'); //可配合 layui 进度条元素使用
            if (n === 100) {
                layer.msg('上传完毕', {icon: 1});
            }
        }
        , data: {'req_dir': $.cookie('file_ispath')}
        , done: function (res) {
            if (res['status'] === 'true') {
                file_render($.cookie('file_ispath'))
            }
        }
    });

    $(".orange-btn-createdir").on('click', function () {
        layer.prompt({
            formType: 0,
            value: '新建文件夹',
            title: '请输入文件夹名称',
            btn: ['确定', '取消'], //按钮，
            btnAlign: 'c'
        }, function (value, index) {
            $.ajax({
                type: "POST",
                url: ogs_backend_url + "/local/file/add",
                dataType: "JSON",
                data: {'req_dir': window.file_ispath, 'mk_filename': value},
                success: function (res) {
                    if (res['status'] === 'true') {
                        layer.close(index)
                        file_render(window.file_ispath)
                    } else if (res['status'] === 'fail') {
                        layer.msg(res['msg'])
                    }
                }
            })
        });
    })

    $(".orange-btn-reload").on('click', function () {
        file_render(window.file_ispath)
    })

    function file_render(file_path, get_type = 'get') {
        $(".file-div").html('')
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/file/def_get",
            dataType: "JSON",
            data: {'req_dir': file_path, 'get_file_type': get_type},
            success: function (res) {
                //console.log(res)
                window.file_ispath = res['ispath']
                $.cookie('file_ispath', file_ispath)
                $('.orange-btn-path').html('当前磁盘总量: ' + res['disk']['total'] + 'G 使用: ' + res['disk']['used'] + 'G 剩余: ' + res['disk']['free'] + 'G  当前目录路径: ' + window.file_ispath)
                // 重载上传文件渲染
                put_file.reload({
                    data: {'req_dir': file_ispath}
                })
                //指定允许上传的文件类型
                let res_dir = res['dir']
                let res_file = res['file']
                for (let i = 0; i < res_dir.length; i++) {
                    let html = '                <button class="layui-btn layui-btn-primary orange-dir" value="' + res_dir[i] + '" id="orange-dir-' + i + '">\n' +
                        '                    <img src="image/文件夹2.png">\n' +
                        '                    <p>' + res_dir[i] + '</p>\n' +
                        '                </button>'
                    $(".file-div").append(html)
                    dropdown.render({
                        elem: "#orange-dir-" + i //也可绑定到 document，从而重置整个右键
                        , trigger: 'contextmenu' //contextmenu
                        , isAllowSpread: false //禁止菜单组展开收缩
                        , style: 'width: 200px' //定义宽度，默认自适应
                        , id: 'test788' //定义唯一索引
                        , data: [{
                            title: '进入'
                            , id: 'load'
                        }, {
                            title: '重命名'
                            , id: 'rename'
                        }, {
                            title: '删除'
                            , id: 'del'
                        }]
                        , click: function (obj, othis) {
                            if (obj.id === 'load') {
                                file_render(res['ispath'] + res_dir[i])
                            } else if (obj.id === 'print') {
                                window.print();
                            } else if (obj.id === 'del') {
                                $.ajax({
                                    type: "POST",
                                    url: ogs_backend_url + "/local/file/del",
                                    dataType: "JSON",
                                    data: {'req_dir': window.file_ispath, 'rm_filename': res_dir[i]},
                                    success: function (res) {
                                        if (res['status'] === 'true') {
                                            file_render(window.file_ispath)
                                        }
                                    }
                                })
                            }
                        }
                    });
                    $("#" + "orange-dir-" + i).dblclick(function () {
                        //console.log($(this).val())
                        file_render(res['ispath'] + res_dir[i])
                    })
                }

                for (let y = 0; y < res_file.length; y++) {
                    let html = '                <button class="layui-btn layui-btn-primary orange-dir" id="orange-file-' + y + '">\n' +
                        '                    <img src="image/文件2.png">\n' +
                        '                    <p>' + res_file[y] + '</p>\n' +
                        '                </button>'
                    $(".file-div").append(html)
                    dropdown.render({
                        elem: "#orange-file-" + y //也可绑定到 document，从而重置整个右键
                        , trigger: 'contextmenu' //contextmenu
                        , isAllowSpread: false //禁止菜单组展开收缩
                        , style: 'width: 200px' //定义宽度，默认自适应
                        , id: 'test799' //定义唯一索引
                        , data: [{
                            title: '下载'
                            , id: 'dow'
                        }, {
                            title: '重命名'
                            , id: 'rename'
                        }, {
                            title: '删除'
                            , id: 'del'
                        }]
                        , click: function (obj, othis) {
                            if (obj.id === 'dow') {
                                window.open('http://10.0.1.198:18000/local/file/download?filename=' + window.file_ispath + res_file[y])
                            } else if (obj.id === 'rename') {
                                window.print();
                            } else if (obj.id === 'del') {
                                $.ajax({
                                    type: "POST",
                                    url: ogs_backend_url + "/local/file/del",
                                    dataType: "JSON",
                                    data: {'req_dir': window.file_ispath, 'rm_filename': res_file[y]},
                                    success: function (res) {
                                        if (res['status'] === 'true') {
                                            file_render(window.file_ispath)
                                        }
                                    }
                                })
                            }
                        }
                    });
                }
            }
        })
    }

    file_render('/')


})