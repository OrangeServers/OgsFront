
//JavaScript代码区域

layui.use(['dropdown', 'table'], function(){
  var table = layui.table,
      dropdown = layui.dropdown;

  get_user_auth_list('property-hostlist')

  //第一个实例
  table.render({
    id: 'test'
    ,elem: '#test'
    ,height: 580
    ,url: ogs_backend_url + '/server/host/list_all'
    ,method: 'POST'
    ,where: {'name': $.cookie('username')}
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
        window.location.href = '/property/property-hostlist/create.html'
      break;

      //自定义头工具栏右侧图标 - 提示
      case 'LAYTABLE_TIPS':
        layer.alert('这是工具栏右侧自定义的一个图标按钮');
      break;
    };
  });

  function get_host_list_page(obj) {
    layui.table.render({
    id: 'test'
    ,elem: '#test'
    ,height: 580
    ,url: ogs_backend_url + '/server/host/list_page'
    ,method: 'POST'
    ,where: {'group_name': obj, 'name': $.cookie('username')}
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
    }

  function get_group_list_name(){
  $.ajax({
  type: "POST",
  url: ogs_backend_url + "/server/host/group/name_list",
  dataType: "JSON",
  data: {'name': $.cookie('username')},
  success: function (res) {
    let data_list = []
    let data_name = res['group_name_list_msg']
    data_name.push('所有资产')
    for (let i=0;i<data_name.length;i++){
      data_list.push({title: data_name[i], id: i})
    }
    dropdown.render({
    elem: '.orange-change-group'
    ,data: data_list
    ,click: function(obj){
      // layer.tips('点击了：'+ obj.title, this.elem, {tips: [1, '#5FB878']})
        for (let i=0;i<data_name.length;i++){
          if (obj.title === data_name[i]) {
            // layer.alert(data_name[i])
            get_host_list_page(data_name[i])
            get_group_list_name()
            }
          }
        }
      });
    }
  })
  }
  // 开启选用表格
  get_group_list_name()

  //监听行工具事件
  table.on('tool(test)', function(obj){
    var data = obj.data;
    //console.log(obj)
    if(obj.event === 'del'){
      layer.confirm('确定删除该资产?', function(index){
        obj.del();
        var host_id = obj.data['id']
        // console.log(host_id);
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
      window.location.href = "/property/property-hostlist/update.html?id=" + data.id
      // $("input[name = 'alias']")
      // layer.alert(data.id, {skin: 'layui-layer-hui'})
    }
  });
  });

    function host_del(obj) {
      $.ajax({
          type: "POST",
          url: ogs_backend_url + "/server/host/del",
          data: {
          'id': obj,
          'cz_name': $.cookie('username')
          },
          dataType: "JSON",
          success: function (res) {
            // location.reload()
          }
      })
    }

