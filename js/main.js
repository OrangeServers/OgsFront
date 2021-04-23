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