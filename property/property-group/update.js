function get_acc_group() {
    let acc_group_id = getParam("id");
    $.ajax({
    type: "POST",
    url: "http://10.0.1.198:18000/server/host/group/list",
    data: {'id': acc_group_id},
    dataType: "JSON",
    success: function (res) {
        if (res['acc_group_list_msg'] !== 'select list msg error') {
            $("input[name = 'id']").val(res["id"])
            $("input[name = 'name']").val(res["name"])
            $("input[name = 'nums']").val(res['nums'])
            $("input[name = 'remarks']").val(res["remarks"])
        } else {
            error('未知错误')
        }
    }
    })
}

function acc_group_update() {
    // layer.alert($('.layui-form').serialize())
       let logif = layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
    $.ajax({
    type: "POST",
    url: "http://10.0.1.198:18000/server/host/group/update",
    data: $('.layui-form').serialize(),
    dataType: "JSON",
    success: function (res) {
        if (res['acc_group_ping_status'] === 'fail') {
          layer.close(logif)
          layer.alert('更新失败，密码或其他错误，主机无法连接', {skin: 'layui-layer-hui'})
        } else if (res['acc_group_into_update']) {
          window.location.href = '../../property/property-grouplist.html'
        } else if (res['acc_group_into_update'] === 'fail') {
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
      acc_group_update()
    });
});

$(function (){
    get_acc_group()
});