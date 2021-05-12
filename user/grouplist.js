
//JavaScript代码区域
layui.use('table', function(){
  var table = layui.table;
  var laydate = layui.laydate;

  //第一个实例
  table.render({
    id: 'test'
    ,elem: '#test'
    ,height: 580
    ,url: 'http://10.0.1.198:18000/account/login/logs'
    ,method: 'POST'
    ,parseData: function(res){ //res 即为原始返回的数据
    return {
      "code": res.host_status, //解析接口状态
      "msg": '', //解析提示文本
      "count": res.login_len_msg, //解析数据长度
      "data": res.login_list_msg //解析数据列表
      };
    }
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field:'login_name', title: '登录用户'}
      ,{field:'login_nw_ip', width: 140, title: '内网ip'}
      ,{field:'login_gw_ip', width: 140, title: '公网ip'}
      ,{field:'login_gw_cs', width: 120, title: '登录地址'}
      ,{field:'login_agent', width: 240, title: '登录设备'}
      ,{field:'login_status', width: 60, title: '状态'}
      ,{field:'login_reason', width: 140, title: '原因'}
      ,{field:'login_time', width: 160, title: '登录时间'}
      // ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width: 80}
    ]]
    ,page: true //开启分页
        ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
    ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
      title: '提示'
      ,layEvent: 'LAYTABLE_TIPS'
      ,icon: 'layui-icon-tips'
    }]
    ,title: '组信息表'
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
        window.location.href = '../property/property-group/create.html'
      break;

      //自定义头工具栏右侧图标 - 提示
      case 'LAYTABLE_TIPS':
        layer.alert('这是工具栏右侧自定义的一个图标按钮');
      break;
    };
  });


    //日期时间范围
  laydate.render({
    elem: '#test10'
    ,type: 'datetime'
    ,range: true
    ,done: function(value, date, endDate){
      console.log(value); //得到日期生成的值，如：2017-08-18
      console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
      console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
    }
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
      window.location.href = "./user-grouplist/update.html?id=" + data.id
      // $("input[name = 'alias']")
      // layer.alert(data.id, {skin: 'layui-layer-hui'})
    }
  });
  });

    function host_del(obj) {
      $.ajax({
          type: "POST",
          url: "http://10.0.1.198:18000/server/acc/group/del",
          data: {
          'id': obj
          },
          dataType: "JSON",
          success: function (res) {
            location.reload()
          }
      })
    }
