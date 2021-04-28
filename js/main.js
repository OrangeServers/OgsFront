    const getParam = function (name) {
        var search = document.location.search;
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    };


    function clean_adhost() {
        window.history.go(-1)
    }

    function orange_alert(time,msg){
        layer.alert(msg, {
          time: time*1000
          ,success: function(layero, index){
            var timeNum = this.time/1000, setText = function(start){
              layer.title((start ? timeNum : --timeNum) + ' 秒后关闭', index);
            };
            setText(!0);
            this.timer = setInterval(setText, 1000);
            if(timeNum <= 0) clearInterval(this.timer);
          }
          ,end: function(){
            clearInterval(this.timer);
          }
        });
    }

    function undata(obj) {
        let undata0 = obj[0]['children']
        let msg_data = []
        for (let i=0;i<undata0.length;i++){
            let undata1 = undata0[i]['children']
            for (let y=0;y<undata1.length;y++){
                // let undata2 = undata1[y]['title']
                let undata2 = undata1[y]['id']
                msg_data.push(undata2)
            }
        }
        return msg_data
    }

    function get_group_name_list() {
        $.ajax({
        type: "POST",
        url: "http://10.0.1.198:18000/server/host/group/name_list",
        dataType: "JSON",
        success: function (res) {
            let data_name = res['group_name_list_msg']
            let option = '';
            for(let i=0;i<data_name.length;i++){
                option +="<option value='"+data_name[i]+"'>"+data_name[i]+"</option>";
            }
            $("#orange_group").html(option);
            layui.form.render('select')
          }
        })
    }

    function get_tree_list () {
  $.ajax({
      type: "POST",
      url: "http://10.0.1.198:18000/local/data",
      dataType: "JSON",
      success: function (res) {
          let data = res['host']
            layui.tree.render({
            elem: '#orange-fx1'
            ,id: 'demoId1'
            ,data: data
            ,showCheckbox: true
            });
      }
  })
}