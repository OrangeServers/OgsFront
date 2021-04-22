function get_host_list() {
    var host_id = getParam("id");
    $.ajax({
    type: "POST",
    url: "http://10.0.1.198:18000/server/host/list",
    data: {'id': host_id},
    dataType: "JSON",
    success: function (res) {
        if (res['host_list_msg'] !== 'select list msg error') {
            $("input[name = 'id']").val(res["id"])
            $("input[name = 'alias']").val(res["alias"])
            $("input[name = 'host_port']").val(res['host_port'])
            $("input[name = 'host_ip']").val(res['host_ip'])
            $("input[name = 'host_user']").val(res["host_user"])
            $("input[name = 'group']").val(res["group"])
        } else if (res['host_list_msg'] === 'select list msg error'){
            error('未知错误')
        }
    }
    })
}

function host_update() {
    // layer.alert($('.layui-form').serialize())
       var logif = layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
    $.ajax({
    type: "POST",
    url: "http://10.0.1.198:18000/server/host/update",
    data: $('.layui-form').serialize(),
    dataType: "JSON",
    success: function (res) {
        if (res['server_ping_status'] === 'fail') {
          layer.close(logif)
          layer.alert('更新失败，密码或其他错误，主机无法连接', {skin: 'layui-layer-hui'})
        } else if (res['server_into_update']) {
          window.location.href = '../property-hostlist.html'
        } else if (res['server_into_update'] === 'fail') {
          layer.close(logif)
          layer.alert('更新失败，未知错误#db error', {skin: 'layui-layer-hui'})
        }
    }
    })
}



layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  //日期
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });
    form.on('submit(demo1)', function(){
      host_update()
    });
});

$(function (){
    get_host_list()
});