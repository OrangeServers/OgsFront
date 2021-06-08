    function get_group_dir() {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/dir/group",
            dataType: "JSON",
            success: function (data) {
                new Vue({
                el: '#sel1',
                data: {
                    sels: data['group_dir_msg']
                }
                })
            }
        })
    }

    $(function (){
        get_user_auth_list('operation-codesync')

         get_group_dir()
    });

    function get_project_dir() {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/dir/project",
            data: {
                'group_dir': $("#sel1").val(),
            },
            dataType: "JSON",
            success: function (res) {
                var res1 = res["msg"]
                var html = ''
                for (var i=0;i<res1.length;i++){
                    html += '<option value="' + res1[i] + '">' + res1[i] + '</option>'
                $("#sel2").html(html)
                }
            }
        })
    }

    function code_sync() {
        let logi = layer.msg('正在同步中')
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/rsync",
            data: {
            'group_dir': $("#sel1").val(),
            'project_dir': $("#sel2").val()
            },
            dataType: "JSON",
            success: function (res) {
                let msg = "同步状态：" + res["status"] + '\n' + "同步信息：" + res["msg"]
                if (res["status"] === 'sucessfuly'){
                    layer.close(logi)
                    layer.msg('同步成功', {icon: 1})
                    $("#shuchu_tex").html('')
                    for (let i=0;i<res["msg"].length;i++){
                        $("#shuchu_tex").append(res["msg"][i] + '\n').css("color","#FF8C00")
                    }
                    // $("#shuchu_tex").html(msg).css("color","#FF8C00")
                } else if (res["status"] === 'fail'){
                    layer.close(logi)
                    layer.msg('同步失败', {icon: 2})
                    $("#shuchu_tex").html(msg)
                }


            }
        });
    }