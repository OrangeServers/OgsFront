function host_add() {
  // layer.alert($('.layui-form').serialize())
       var logif = layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
    $.ajax({
    type: "POST",
    url: ogs_backend_url + "/server/host/add",
    data: $('.layui-form').serialize(),
    dataType: "JSON",
    success: function (res) {
        if (res['server_add_status'] === 'true') {
            window.location.href = '/property/property-hostlist.html'
        } else if (res['server_add_status'] === 'fail') {
          layer.close(logif)
          layer.alert('添加失败，密码或其他错误')
        } else if (res['server_add_status'] === 'con_fail') {
          layer.close(logif)
          layer.alert('添加失败，主机无法连接')
        } else if (res['server_add_status'] === 'sel_fail') {
          layer.close(logif)
          layer.alert('添加失败，该主机已存在')
        }
    }
    })
}
layui.use(['form', 'layedit', 'laydate', 'element'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,element = layui.element;

  get_user_auth_list('property-hostlist')

  // 获取组名列表
    get_group_name_list()

  //日期
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });
    form.on('submit(demo1)', function(){
      host_add()
    });
});