layui.use(['tree', 'util'], function() {
    var tree = layui.tree
        , layer = layui.layer
        , util = layui.util

    get_user_auth_list('operation-batchcommand')

     //开启复选框
        get_tree_list()

      // 批量执行命令
        function host_list_command(list_id) {
        // let logif = layer.msg('正在批量执行')
        let logif = layer.load(1, {
          shade: [0.1,'#fff'] //0.1透明度的白色背景
        });
        $.ajax({
          type: "POST",
          url: ogs_backend_url + "/server/host_list_cmd",
          // useCORS: true,
          data: {
            'host_id': list_id,
            'command': $("#shuru_tex").val(),
            'com_name': $.cookie('username')
          },
          // 设置后去掉数组传参中带的[]  使后台能正常接收
          traditional: true,
          dataType: "JSON",
          success: function (res) {
              if (res["server_ping_status"] === 'true'){
                  layer.close(logif)
                  layer.msg('批量执行完成', {icon: 1})
                  var com_ls = res["command_msg"]
                  var com_hs = res["hostname_list"]
                  var com_msg = ''
                  var com_host = ''
                  var com_jh = ''
                  for (var i=0;i<com_ls.length;i++){
                      com_msg = com_ls[i] + '\n'
                      for (var y=0;y<=i;y++){
                          com_host = com_hs[y] + '  // 机器执行结果 // :' + '\n'
                      }
                      com_jh += com_host + com_msg
                  }
                  $("#shuchu_tex").html('批量命令执行结果' + '\n' + '\n' + com_jh).css({"color": "#FF8C00","font-size": "10px"})
            } else if (res["server_ping_status"] === 'fail'){
                  layer.close(logif)
                  layer.msg('批量执行失败', {icon: 2})
            }
          }
        })
    }

      //按钮事件
  util.event('lay-demo', {
    getChecked: function(othis){
      var checkedData = tree.getChecked('demoId1'); //获取选中节点的数据
        if (checkedData.length === 0){
            layer.msg('必须选择资产组或资产才能执行', {icon: 7});
        } else if($("#shuru_tex").val() === '') {
            layer.msg('请输入执行命令', {icon: 7});
        } else {
            let id_data = undata(checkedData)
            host_list_command(id_data)
            // console.log(host_list_command(id_data))
        }
        // layer.alert(JSON.stringify(checkedData), {shade:0});
        // console.log(checkedData);
    }
    ,resetMsg: function (){
        $("#shuru_tex").val("")
      }
    ,createHost: function (){
        window.location.href = '/property/property-hostlist/create.html'
      }
    ,createGroup: function (){
        window.location.href = '/property/property-group/create.html'
      }
    ,reload: function(){
      //重载实例
      tree.reload('demoId1', {

      });

    }
  });

})