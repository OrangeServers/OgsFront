layui.use(['tree', 'util'], function() {
    var tree = layui.tree
        , layer = layui.layer
        , util = layui.util


     //开启复选框
  $.ajax({
      type: "POST",
      url: "http://10.0.1.198:18000/local/data",
      dataType: "JSON",
      success: function (res) {
          let data = res['host']
            tree.render({
            elem: '#orange-fx1'
            ,id: 'demoId1'
            ,data: data
            ,showCheckbox: true
            });
      }
  })

      // 批量执行命令
        function host_list_command(list_id) {
        $.ajax({
          type: "POST",
          url: "http://10.0.1.198:18000/server/host_list_cmd",
          // useCORS: true,
          data: {
            'host_ip': list_id,
            'command': $("#shuru_tex").val()
          },
          // 设置后去掉数组传参中带的[]  使后台能正常接收
          traditional: true,
          dataType: "JSON",
          success: function (res) {
              if (res["server_ping_status"] === 'true'){
                  orange_alert(1,'批量执行成功')
                  var com_ls = res["command_msg"]
                  var com_hs = res["hostname_list"]
                  var com_msg = ''
                  var com_host = ''
                  var com_jh = ''
                  for (var i=0;i<com_ls.length;i++){
                      com_msg = com_ls[i] + '\n'
                      for (var y=0;y<=i;y++){
                          com_host = com_hs[y] + ' 机器执行结果:' + '\n'
                      }
                      com_jh += com_host + com_msg
                  }
                  $("#shuchu_tex").html('批量命令执行成功' + '\n' + com_jh).css("color","#FF8C00")
            } else if (res["server_ping_status"] === 'fail'){
                orange_alert(1,'执行失败')
            }
          }
        })
    }

      //按钮事件
  util.event('lay-demo', {
    getChecked: function(othis){
      var checkedData = tree.getChecked('demoId1'); //获取选中节点的数据
        if (checkedData.length === 0){
            layer.msg('必须选择资产组或资产才能执行', {icon: 5});
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
    ,reload: function(){
      //重载实例
      tree.reload('demoId1', {

      });

    }
  });

})