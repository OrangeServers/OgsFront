// 版本4.9.0 <br>

// import {FitAddon} from './xterm/xterm-addon-fit/src/FitAddon'
//  document.write("<script language=javascript src="+url+"></script>");


function runFakeTerminal(termid, host) {

    // let fitAddon = new FitAddon()

    let term = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: 33, //行数
        convertEol: true, //启用时，光标将设置为下一行的开头
        scrollback: 50,//终端中的回滚量
        disableStdin: false, //是否应禁用输入。
        cursorStyle: 'underline', //光标样式
        cursorBlink: true, //光标闪烁
        theme: {
            foreground: '#ffffff', //字体
            background: '#060101', //背景色
            cursor: 'help',//设置光标
        }
    })
    // term.fitAddon = new window.FitAddon.FitAddon();
    // term.loadAddon(term.fitAddon)

    term.open(document.getElementById(termid))
    // term.fitAddon.fit()

    term.writeln(`                                                          hello!
                                        Welcome to Orange Shell Services !
`)

    //var ws = new WebSocket('ws://10.0.1.198:8014/websocket')
    let ws = new WebSocket('ws://10.0.1.198:28000/local/websocket');
    //let lockReconnect = false //避免重复连接

    ws.onmessage = function (MessageEvent) {
        //console.log(MessageEvent);
        //console.log(MessageEvent.data);
        //  var time=new Date();
        //  var t= time.toLocaleString();
        //  var p=document.createElement("p");
        //  p.innerText="("+t+")"+MessageEvent.data;
        //  term.write(p);
        //heartCheck.reset().start()
        term.write(MessageEvent.data)
    };

    let ssh_host_name = {
        'hostname': host
    }

    ws.onopen = function () {
        //ws.send(JSON.stringify(ssh_host_data))
        ws.send(JSON.stringify(ssh_host_name))
        ws.send('\r')
        //heartCheck.reset().start()
    }

    ws.onerror = function () {
        console.log('连接失败')
        term.writeln('\nUnable to connect to host: [Errno 110] Connection timed out, Please check that the password is correct or the server is running')
        ws.close()
        $("." + host).css("color", "red")
    }

    ws.onclose = function () {
        console.log('连接失败')
        term.writeln('\nUnable to connect to host: [Errno 110] Connection timed out, Please check that the password is correct or the server is running')
        ws.close()
        $("." + host).css("color", "red")
    }


    function send() {
        var msg = document.getElementById('msg').value;
        ws.send(msg);
    }


    if (term._initialized) {
        return
    }

    term._initialized = true

    term.prompt = () => {
        // term.write('\r\n$ ')
        term.write('\r\n')
    }

    term.prompt()
    let msg_list = ''
    term.onKey(e => {

        const ev = e.domEvent
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
        if (e.key === '\r') {
            ws.send(msg_list + '\r')
            //ws.send('\r')
            msg_list = ''
        } else if (e.key === '\t') {
            ws.send(msg_list + '\t' + '\t')
        } else {
            msg_list += e.key
        }
        let dt = e.domEvent.altKey
        if (ev.keyCode === 13) {
            term.prompt()
        } else if (ev.keyCode === 8) {
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
                term.write('\b \b')
            }
        } else if (printable) {
            term.write(e.key)
        }
    })

}

layui.config({
    base: '/layui/layuimod/dtree/'
}).extend({
    dtree: 'dtree'
})


layui.use(['tree', 'util', 'upload', 'element', 'layer', 'dtree'], function () {
    let tree = layui.tree
        , $ = layui.jquery
        , upload = layui.upload
        , element = layui.element
        , layer = layui.layer
        , util = layui.util //Tab的切换功能，切换事件监听等，需要依赖element模块
        , dtree = layui.dtree;

    function get_tree_list() {
        $.ajax({
            type: "POST",
            url: ogs_backend_url + "/local/data",
            dataType: "JSON",
            data: {'name': $.cookie('username')},
            showLine: true,
            edit: ['add', 'update', 'del'],
            success: function (res) {
                let data = res['host']
                dtree.render({
                    elem: '#orange-fx1'
                    , id: 'demoId1'
                    , data: data
                    , iconfont: ["layui-icon"]
                    , iconfontStyle: [{
                        fnode: {
                            node: {
                                open: "dtree-icon-jia1"
                            }
                        },
                        snode: {  //二级节点
                            node: {  //非叶子节点
                                // open:"",  //节点展开
                                // close:""  //节点关闭
                            },
                            leaf: "layui-icon-template-1"  //叶子节点
                        }
                    }]
                });
            }
        })
    }

    get_tree_list()


    dtree.on("node('orange-fx1')", function (obj) {
        if (obj.param['nodeId'] < 1000) {
            //  console.log(obj.param['context']); //得到当前点击的节点数据
            let termid = Math.floor(Math.random() * 100000)
            element.tabAdd('demo', {
                title: '<i class="layui-icon layui-icon-circle-dot ' + obj.param['context'] + '" style="font-size: 10px; color: #4cb450; margin-right: 10px"></i>' + obj.param['context'] //用于演示
                , content: '<div id="' + termid + '"></div>'
                , id: termid //实际使用一般是规定好的id，这里以时间戳模拟下
            })
            runFakeTerminal(termid, obj.param['context'])
            element.tabChange('demo', termid);
        }
    })


    //触发事件
    var active = {
        tabAdd: function () {
            //新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项' + (Math.random() * 1000 | 0) //用于演示
                , content: '内容' + (Math.random() * 1000 | 0)
                , id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
            })
        }
        , tabDelete: function (othis) {
            //删除指定Tab项
            element.tabDelete('demo', '44'); //删除：“商品管理”


            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function () {
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });


});

