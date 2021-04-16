
//JavaScript代码区域
layui.use('element', function(){
  var element = layui.element;

});

layui.use('table', function(){
  var table = layui.table;

  //第一个实例
  table.render({
    id: 'test'
    ,elem: '#test'
    ,height: 580
    ,url: 'http://10.0.1.198:18000/server/host_list_all'
    ,method: 'POST'
    ,parseData: function(res){ //res 即为原始返回的数据
    return {
      "code": res.host_status, //解析接口状态
      "msg": '', //解析提示文本
      "count": res.host_len_msg, //解析数据长度
      "data": res.host_list_msg //解析数据列表
      };
    }
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field:'id', width:80, sort: true, title: 'id'}
      ,{field:'alias', title: '名称'}
      ,{field:'host_ip', title: 'ip地址'}
      ,{field:'host_port', width:80, title: '端口'}
      ,{field:'host_user', title: '登录用户'}
      ,{field:'group', title: '组名'}
      ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
    ]]
    ,page: true //开启分页
        ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
    ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
      title: '提示'
      ,layEvent: 'LAYTABLE_TIPS'
      ,icon: 'layui-icon-tips'
    }]
    ,title: '资产信息表'
  });


  //头工具栏事件
  table.on('toolbar(test)', function(obj){
    var checkStatus = table.checkStatus(obj.config.id);
    switch(obj.event){
      case 'getCheckData':
        var data = checkStatus.data;
        layer.alert(JSON.stringify(data));
      break;
      case 'getCheckLength':
        var data = checkStatus.data;
        layer.msg('选中了：'+ data.length + ' 个');
      break;
      case 'isAll':
        layer.msg(checkStatus.isAll ? '全选': '未全选');
      break;
      case 'createData':
        window.location.href = '../property/property-hostlist/create.html'
      break;

      //自定义头工具栏右侧图标 - 提示
      case 'LAYTABLE_TIPS':
        layer.alert('这是工具栏右侧自定义的一个图标按钮');
      break;
    };
  });

  //监听行工具事件
  table.on('tool(test)', function(obj){
    var data = obj.data;
    //console.log(obj)
    if(obj.event === 'del'){
      layer.confirm('确定删除该资产?', function(index){
        // obj.del();
        var host_id = obj.data['id']
        console.log(host_id);
        host_del(host_id)
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
      // layer.prompt({
      //   formType: 2
      //   ,value: data.email
      // }, function(value, index){
      //   obj.update({
      //     email: value
      //   });
      //   layer.close(index);
      // });
      window.location.href = "/code/OgsFront/property-hostlist/update.html?id=" + data.id
      // $("input[name = 'alias']")
      // layer.alert(data.id, {skin: 'layui-layer-hui'})
    }
  });
  });

    function host_del(obj) {
      $.ajax({
          type: "POST",
          url: "http://10.0.1.198:18000/server/host_del",
          data: {
          'id': obj
          },
          dataType: "JSON",
          success: function (res) {
            location.reload()
          }
      })
    }


//
// function get_host_list() {
//   $.ajax({
//     type: "POST",
//     url: "http://10.0.1.198:18000/server/host_list_all",
//     dataType: "JSON",
//     success: function (res) {
//       var msg = res['host_list_msg']
//       for (i=0;i<msg.length;i++) {
//         // console.log(msg[i]['alias']);
//         var html = `<tr>      <td></td>
//       <td>${msg[i]['id']}</td>
//       <td>${msg[i]['alias']}</td>
//       <td>${msg[i]['host_ip']}</td>
//       <td>${msg[i]['host_port']}</td>
//       <td>${msg[i]['host_user']}</td>
//       <td>${msg[i]['group']}</td>
//       <td>  <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
//   <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
//       </td></tr>`
//         console.log(html);
//
//       }
//       $("#orange-host-tbody").html(html)
//         // alert(msg[1]['alias'])
//     }
//   })
// }
//
// $(function (){
//     get_host_list()
// });
