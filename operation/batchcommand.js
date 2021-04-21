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


      //按钮事件
  util.event('lay-demo', {
    getChecked: function(othis){
      var checkedData = tree.getChecked('demoId1'); //获取选中节点的数据
        layer.alert(JSON.stringify(checkedData), {shade:0});
        console.log(checkedData);
    }
    ,setChecked: function(){
      tree.setChecked('demoId1', [12, 16]); //勾选指定节点
    }
    ,reload: function(){
      //重载实例
      tree.reload('demoId1', {

      });

    }
  });

})