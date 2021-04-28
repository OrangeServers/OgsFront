layui.use(['tree', 'util', 'upload', 'element', 'layer'], function() {
    let tree = layui.tree
        ,$ = layui.jquery
        ,upload = layui.upload
        ,element = layui.element
        , layer = layui.layer
        , util = layui.util;

    //开启复选框
        get_tree_list()


     // 按钮事件
  util.event('lay-demo', {
    getChecked: function(othis){
      var checkedData = tree.getChecked('demoId1'); //获取选中节点的数据
        // if (checkedData.length === 0){
        //     layer.msg('必须选择资产组或资产才能执行', {icon: 7});
        // } else {
            let id_data = undata(checkedData)
        // }
    }
    ,resetMsg: function (){
        $("#shuru_tex").val("")
      }
    ,createHost: function (){
        window.location.href = '../../property/property-hostlist/create.html'
      }
    ,createGroup: function (){
        window.location.href = '../../property/property-group/create.html'
      }
    ,reload: function(){
      //重载实例
      tree.reload('demoId1', {

      });

    }
  });

      //拖拽上传
function upload_sh_put(){
   // let checkedData = tree.getChecked('demoId1')
   //  let id_data = undata(checkedData)
   upload.render({
    elem: '#test10'
    ,url: 'https://httpbin.org/post' //改成您自己的上传接口
    ,accept: 'file'
    ,auto: false
    ,bindAction: '#test9'
    // ,data: {'host_id': id_data}
    ,choose: function(obj){
      //读取本地文件
      obj.preview(function(index, file, result){
          if (file === ''){
              alert('请上传文件')
          }
          let tr = $([
          '<p>区域继续拖拽或点击上传脚本可覆盖原文件</p>'
          ,'<table class="layui-table">'
          ,'<tbody id="demoList">'
          ,'<tr id="upload-'+ index +'">'
          ,'<td>'+ "文件名: " + file.name + '</td>'
          ,'<td>'+ "大小: " + (file.size/1024).toFixed(1) +'kb </td>'
          ,'<td>状态: 等待上传</td>'
          ,'</tr>'
          ,'</tbody>'
          ,'</table>'
          ].join(''))
        $('#test10').html(tr)
      });
    }
    ,done: function(res){
      layer.msg('上传成功');
      // layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', res.files.file);
      console.log(res)
    //   if (res["server_ping_status"] === 'true'){
    //       layer.close(logif)
    //       layer.msg('批量执行完成', {icon: 1})
    //       var com_ls = res["command_msg"]
    //       var com_hs = res["hostname_list"]
    //       var com_msg = ''
    //       var com_host = ''
    //       var com_jh = ''
    //       for (var i=0;i<com_ls.length;i++){
    //           com_msg = com_ls[i] + '\n'
    //           for (var y=0;y<=i;y++){
    //               com_host = com_hs[y] + '  // 机器执行结果 // :' + '\n'
    //           }
    //           com_jh += com_host + com_msg
    //       }
    //       $("#shuchu_tex").html('批量命令执行结果' + '\n' + '\n' + com_jh).css({"color": "#FF8C00","font-size": "10px"})
    // } else if (res["server_ping_status"] === 'fail'){
    //       layer.close(logif)
    //       layer.msg('批量执行失败', {icon: 2})
    // }
    }
  });
}

upload_sh_put()

})