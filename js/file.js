layui.use(['upload', 'element', 'layer'], function(){
  var $ = layui.jquery
  ,upload = layui.upload
  ,element = layui.element
  ,layer = layui.layer;

  get_user_auth_list('filetransfer')

  //常规使用 - 普通图片上传
  var uploadInst = upload.render({
    elem: '#test1'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo1').attr('src', result); //图片链接（base64）
      });

      element.progress('demo', '0%'); //进度条复位
      layer.msg('上传中', {icon: 16, time: 0});
    }
    ,done: function(res){
      //如果上传失败
      if(res.code > 0){
        return layer.msg('上传失败');
      }
      //上传成功的一些操作
      //……
      $('#demoText').html(''); //置空上传失败的状态
    }
    ,error: function(){
      //演示失败状态，并实现重传
      var demoText = $('#demoText');
      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
      demoText.find('.demo-reload').on('click', function(){
        uploadInst.upload();
      });
    }
    //进度条
    ,progress: function(n, index, e){
      element.progress('demo', n + '%'); //可配合 layui 进度条元素使用
      if(n == 100){
        layer.msg('上传完毕', {icon: 1});
      }
    }
  });

  //多图片上传
  upload.render({
    elem: '#test2'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,multiple: true
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
      });
    }
    ,done: function(res){
      //上传完毕
    }
  });

  //指定允许上传的文件类型
  upload.render({
    elem: '#test3'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,accept: 'file' //普通文件
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      // obj.preview(function(index, file, result){
      //   $('#demo1').attr('src', result); //图片链接（base64）
      // });

      element.progress('demo', '0%'); //进度条复位
      layer.msg('上传中', {icon: 16, time: 0});
    }
    ,done: function(res){
      // layer.msg('上传成功');
      console.log(res);
    }
    ,progress: function(n, index, e){
      element.progress('demo', n + '%'); //可配合 layui 进度条元素使用
      if(n == 100){
        layer.msg('上传完毕', {icon: 1});
      }
    }
  });
  upload.render({ //允许上传的文件后缀
    elem: '#test4'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,accept: 'file' //普通文件
    ,exts: 'zip|rar|7z' //只允许上传压缩文件
    ,done: function(res){
      layer.msg('上传成功');
      console.log(res)
    }
  });
  upload.render({
    elem: '#test5'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,accept: 'video' //视频
    ,done: function(res){
      layer.msg('上传成功');
      console.log(res)
    }
  });
  upload.render({
    elem: '#test6'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,accept: 'audio' //音频
    ,done: function(res){
      layer.msg('上传成功');
      console.log(res)
    }
  });

  //设定文件大小限制
  upload.render({
    elem: '#test7'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,size: 60 //限制文件大小，单位 KB
    ,done: function(res){
      layer.msg('上传成功');
      console.log(res)
    }
  });

  //同时绑定多个元素，并将属性设定在元素上
  upload.render({
    elem: '.demoMore'
    ,before: function(){
      layer.tips('接口地址：'+ this.url, this.item, {tips: 1});
    }
    ,done: function(res, index, upload){
      var item = this.item;
      console.log(item); //获取当前触发上传的元素，layui 2.1.0 新增
    }
  })

  //选完文件后不自动上传
  upload.render({
    elem: '#test8'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,auto: false
    //,multiple: true
    ,bindAction: '#test9'
    ,done: function(res){
      layer.msg('上传成功');
      console.log(res)
    }
  });

  //拖拽上传
  upload.render({
    elem: '#test10'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,accept: 'file'
    ,done: function(res){
      layer.msg('上传成功');
      layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', res.files.file);
      console.log(res)
    }
  });

  //多文件列表示例
  var demoListView = $('#demoList')
  ,uploadListIns = upload.render({
    elem: '#testList'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,accept: 'file'
    ,multiple: true
    ,auto: false
    ,bindAction: '#testListAction'
    ,choose: function(obj){
      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
      //读取本地文件
      obj.preview(function(index, file, result){
        var tr = $(['<tr id="upload-'+ index +'">'
          ,'<td>'+ file.name +'</td>'
          ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
          ,'<td>等待上传</td>'
          ,'<td>'
            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
          ,'</td>'
        ,'</tr>'].join(''));

        //单个重传
        tr.find('.demo-reload').on('click', function(){
          obj.upload(index, file);
        });

        //删除
        tr.find('.demo-delete').on('click', function(){
          delete files[index]; //删除对应的文件
          tr.remove();
          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
        });

        demoListView.append(tr);
      });
    }
    ,done: function(res, index, upload){
      if(res.files.file){ //上传成功
        var tr = demoListView.find('tr#upload-'+ index)
        ,tds = tr.children();
        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
        tds.eq(3).html(''); //清空操作
        return delete this.files[index]; //删除文件队列已经上传成功的文件
      }
      this.error(index, upload);
    }
    ,error: function(index, upload){
      var tr = demoListView.find('tr#upload-'+ index)
      ,tds = tr.children();
      tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
    }
  });

  //绑定原始文件域
  upload.render({
    elem: '#test20'
    ,url: ogs_backend_url + '/local/file' //改成您自己的上传接口
    ,done: function(res){
      layer.msg('上传成功');
      console.log(res)
    }
  });

});