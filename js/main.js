// js内导入其他js
// document.write("<script src=\"http://pv.sohu.com/cityjson?ie=utf-8\"></script>");

// 页面布局渲染
function upload_layui_admin(cas_this) {
    let color_matching = ''

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/settings/get",
        data: {'name': 'admin'},
        dataType: "JSON",
        async: false,
        success: function (res) {
            if (res['color_matching'] === 'black'){
                let color_matching_head = '#faa755'
                color_matching = '#393D49'
                $('.layui-header').css('background-color', color_matching_head)
            } else if (res['color_matching'] === 'blue'){
                let color_matching_head = '#2261A1'
                color_matching = '#2F4056'
                $('.layui-header').css('background-color', color_matching_head)
            }
        }
    })

    let user_name = $.cookie('username')
    let path = ogs_backend_url + '/local/image/test_get/'

    let cas_this1 = '',
        cas_this2 = '',
        cas_this3 = '',
        cas_this4 = ''

    let cas_item_this1 = '',
        cas_item_this2 = '',
        cas_item_this3 = '',
        cas_item_this4 = '',
        cas_item_this5 = '',
        cas_item_this6 = '',
        cas_item_this7 = '',
        cas_item_this8 = '',
        cas_item_this9 = '',
        cas_item_this10 = '',
        cas_item_this11 = '',
        cas_item_this12 = '',
        cas_item_this13 = '',
        cas_item_this14 = ''

    let cas_item1 = '',
        cas_item2 = '',
        cas_item3 = '',
        cas_item4 = '',
        cas_item5 = ''

    // 单页渲染
    if (cas_this === 'index') {
        cas_this1 = 'class="layui-this"'
    } else if (cas_this === 'authority') {
        cas_this2 = 'class="layui-this"'
    } else if (cas_this === 'filetransfer') {
        cas_this3 = 'class="layui-this"'
    } else if (cas_this === 'settings') {
        cas_this4 = 'class="layui-this"'
    }
    // 副页property渲染
    else if (cas_this === 'property-hostlist') {
        cas_item1 = ' layui-nav-itemed'
        cas_item_this1 = 'class="layui-this"'
    } else if (cas_this === 'property-grouplist') {
        cas_item1 = ' layui-nav-itemed'
        cas_item_this2 = 'class="layui-this"'
    } else if (cas_this === 'property-userlist') {
        cas_item1 = ' layui-nav-itemed'
        cas_item_this3 = 'class="layui-this"'
    }
    // 副页user渲染
    else if (cas_this === 'user-userlist') {
        cas_item2 = ' layui-nav-itemed'
        cas_item_this4 = 'class="layui-this"'
    } else if (cas_this === 'user-grouplist') {
        cas_item2 = ' layui-nav-itemed'
        cas_item_this5 = 'class="layui-this"'
    }
    // 副页operation渲染
    else if (cas_this === 'operation-batchscript') {
        cas_item3 = ' layui-nav-itemed'
        cas_item_this6 = 'class="layui-this"'
    } else if (cas_this === 'operation-batchcommand') {
        cas_item3 = ' layui-nav-itemed'
        cas_item_this7 = 'class="layui-this"'
    } else if (cas_this === 'operation-codesync') {
        cas_item3 = ' layui-nav-itemed'
        cas_item_this8 = 'class="layui-this"'
    }
    // 副页container渲染
    else if (cas_this === 'container-imagelist') {
        cas_item4 = ' layui-nav-itemed'
        cas_item_this9 = 'class="layui-this"'
    } else if (cas_this === 'container-dockerlist') {
        cas_item4 = ' layui-nav-itemed'
        cas_item_this10 = 'class="layui-this"'
    } else if (cas_this === 'container-kubernetes') {
        cas_item4 = ' layui-nav-itemed'
        cas_item_this11 = 'class="layui-this"'
    }
    // 副页audit渲染
    else if (cas_this === 'audit-userlog') {
        cas_item5 = ' layui-nav-itemed'
        cas_item_this12 = 'class="layui-this"'
    } else if (cas_this === 'audit-comlog') {
        cas_item5 = ' layui-nav-itemed'
        cas_item_this13 = 'class="layui-this"'
    } else if (cas_this === 'audit-rslog') {
        cas_item5 = ' layui-nav-itemed'
        cas_item_this14 = 'class="layui-this"'
    }

    let head_html = '    <div class="layui-logo"><a href="/index.html"><img src="/image/juzi11.png" width="40" height="40">OrangeServer</a></div>\n' +
        '    <!-- 头部区域（可配合layui 已有的水平导航） -->\n' +
        '    <ul class="layui-nav layui-layout-left">\n' +
        '      <li class="layui-nav-item"><a href="">nav 1</a></li>\n' +
        '      <li class="layui-nav-item"><a href="">nav 2</a></li>\n' +
        '      <li class="layui-nav-item"><a href="">nav 3</a></li>\n' +
        '      <li class="layui-nav-item">\n' +
        '        <a href="javascript:;">nav groups</a>\n' +
        '        <dl class="layui-nav-child">\n' +
        '          <dd><a href="">menu 11</a></dd>\n' +
        '          <dd><a href="">menu 22</a></dd>\n' +
        '          <dd><a href="">menu 33</a></dd>\n' +
        '        </dl>\n' +
        '      </li>\n' +
        '    </ul>\n' +
        '    <ul class="layui-nav layui-layout-right">\n' +
        '      <li class="layui-nav-item">\n' +
        '        <a href="javascript:;" class="orange-title-name">\n' +
        '          <img src="'+ path + user_name +'" class="layui-nav-img">\n' +
        '          ' + user_name + '\n' +
        '        </a>\n' +
        '        <dl class="layui-nav-child">\n' +
        '          <dd><a href="">用户资料</a></dd>\n' +
        '          <dd><a href="/user/user-information/update.html">修改信息</a></dd>\n' +
        '        </dl>\n' +
        '      </li>\n' +
        '      <li class="layui-nav-item"><a class="orange-login-out" onclick="delete_cookie()">退出登录</a></li>\n' +
        '    </ul>'

    let side_html = '    <div class="layui-side-scroll" style="background-color: '+ color_matching + '">\n' +
        '      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->\n' +
        '      <ul class="layui-nav layui-nav-tree"  lay-filter="test" style="background-color: '+ color_matching + '">\n' +
        '        <li class="layui-nav-item"><a href="/index.html"' + cas_this1 + '><img src="/image/仪表盘.png" width="20" height="20">仪表盘</a></li>\n' +
        '        <li class="layui-nav-item' + cas_item1 + '">\n' +
        '          <a class="" href="javascript:;"><img src="/image/资产管理.png" width="20" height="20">资产管理</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/property/property-hostlist.html"' + cas_item_this1 + '><img src="/image/juzi11.png" width="20" height="20">资产列表</a></dd>\n' +
        '            <dd><a href="/property/property-grouplist.html"' + cas_item_this2 + '><img src="/image/juzi11.png" width="20" height="20">资产组</a></dd>\n' +
        '            <dd><a href="/property/property-userlist.html"' + cas_item_this3 + '><img src="/image/juzi11.png" width="20" height="20">系统用户</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item' + cas_item2 + '" id="orange-auth-del-yhgl">\n' +
        '          <a href="javascript:;"><img src="/image/用户管理.png" width="20" height="20">用户管理</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/user/user-userlist.html"' + cas_item_this4 + '><img src="/image/juzi11.png" width="20" height="20">用户列表</a></dd>\n' +
        '            <dd><a href="/user/user-grouplist.html"' + cas_item_this5 + '><img src="/image/juzi11.png" width="20" height="20">用户组</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item' + cas_item3 + '">\n' +
        '          <a href="javascript:;"><img src="/image/执行日志.png" width="20" height="20">操作中心</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/operation/operation-batchscript.html"' + cas_item_this6 + '><img src="/image/juzi11.png" width="20" height="20">批量脚本</a></dd>\n' +
        '            <dd><a href="/operation/operation-batchcommand.html"' + cas_item_this7 + '><img src="/image/juzi11.png" width="20" height="20">批量命令</a></dd>\n' +
        '            <dd><a href="/osh/shell.html" target="_blank"><img src="/image/juzi11.png" width="20" height="20">shell终端</a></dd>\n' +
        '            <dd><a href="/operation/operation-codesync.html"' + cas_item_this8 + '><img src="/image/juzi11.png" width="20" height="20">代码同步</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item' + cas_item4 + '">\n' +
        '          <a href="javascript:;"><img src="/image/容器.png" width="20" height="20">容器管理</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/container/container-imagelist.html"' + cas_item_this9 + '><img src="/image/juzi11.png" width="20" height="20">镜像列表</a></dd>\n' +
        '            <dd><a href="/container/container-dockerlist.html"' + cas_item_this10 + '><img src="/image/juzi11.png" width="20" height="20">容器列表</a></dd>\n' +
        '            <dd><a href="/container/container-kubernetes.html"' + cas_item_this11 + '><img src="/image/juzi11.png" width="20" height="20">kubernetes</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item' + cas_item5 + '">\n' +
        '          <a href="javascript:;"><img src="/image/日志.png" width="20" height="20">日志审计</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/audit/audit-userlog.html"' + cas_item_this12 + '><img src="/image/juzi11.png" width="20" height="20">登录日志</a></dd>\n' +
        '            <dd><a href="/audit/audit-comlog.html"' + cas_item_this13 + '><img src="/image/juzi11.png" width="20" height="20">操作日志</a></dd>\n' +
        '            <dd><a href="/audit/audit-rslog.html"' + cas_item_this14 + '><img src="/image/juzi11.png" width="20" height="20">同步日志</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item"><a href="/authority/authority.html"' + cas_this2 + '><img src="/image/权限.png" width="20" height="20">权限管理</a></li>\n' +
        '        <li class="layui-nav-item"><a href="/filetransfer.html"' + cas_this3 + '><img src="/image/文件.png" width="20" height="20">文件传输</a></li>\n' +
        '        <li class="layui-nav-item"><a href="/settings.html"' + cas_this4 + '><img src="/image/设置.png" width="20" height="20">系统设置</a></li>\n' +
        '      </ul>\n' +
        '    </div>'

    $(".layui-header").html(head_html)
    $(".layui-side").html(side_html)
    // 重新渲染整个页面
    // layui.element.init()
    layui.element.render('nav')
    layui.element.render('breadcrumb')
}

// 非管理员权限的页面渲染
function upload_layui_develop(cas_this) {
    let color_matching = ''

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/settings/get",
        data: {'name': 'admin'},
        dataType: "JSON",
        async: false,
        success: function (res) {
            if (res['color_matching'] === 'black'){
                let color_matching_head = '#faa755'
                color_matching = '#393D49'
                $('.layui-header').css('background-color', color_matching_head)
            } else if (res['color_matching'] === 'blue'){
                let color_matching_head = '#2261A1'
                color_matching = '#2F4056'
                $('.layui-header').css('background-color', color_matching_head)
            }
        }
    })


    let user_name = $.cookie('username')
    let path = ogs_backend_url + '/local/image/test_get/'

    let cas_this1 = '',
        cas_this3 = '',
        cas_this4 = ''

    let cas_item_this1 = '',
        cas_item_this3 = '',
        cas_item_this6 = '',
        cas_item_this7 = '',
        cas_item_this8 = '',
        cas_item_this9 = '',
        cas_item_this10 = '',
        cas_item_this11 = ''

    let cas_item1 = '',
        cas_item3 = '',
        cas_item4 = ''

    // 单页渲染
    if (cas_this === 'index') {
        cas_this1 = 'class="layui-this"'
    } else if (cas_this === 'filetransfer') {
        cas_this3 = 'class="layui-this"'
    } else if (cas_this === 'settings') {
        cas_this4 = 'class="layui-this"'
    }
    // 副页property渲染
    else if (cas_this === 'property-hostlist') {
        cas_item1 = ' layui-nav-itemed'
        cas_item_this1 = 'class="layui-this"'
    } else if (cas_this === 'property-userlist') {
        cas_item1 = ' layui-nav-itemed'
        cas_item_this3 = 'class="layui-this"'
    }
    // 副页operation渲染
    else if (cas_this === 'operation-batchscript') {
        cas_item3 = ' layui-nav-itemed'
        cas_item_this6 = 'class="layui-this"'
    } else if (cas_this === 'operation-batchcommand') {
        cas_item3 = ' layui-nav-itemed'
        cas_item_this7 = 'class="layui-this"'
    } else if (cas_this === 'operation-codesync') {
        cas_item3 = ' layui-nav-itemed'
        cas_item_this8 = 'class="layui-this"'
    }
    // 副页container渲染
    else if (cas_this === 'container-imagelist') {
        cas_item4 = ' layui-nav-itemed'
        cas_item_this9 = 'class="layui-this"'
    } else if (cas_this === 'container-dockerlist') {
        cas_item4 = ' layui-nav-itemed'
        cas_item_this10 = 'class="layui-this"'
    } else if (cas_this === 'container-kubernetes') {
        cas_item4 = ' layui-nav-itemed'
        cas_item_this11 = 'class="layui-this"'
    }

    let head_html = '    <div class="layui-logo"><a href="/index.html"><img src="/image/juzi11.png" width="40" height="40">OrangeServer</a></div>\n' +
        '    <!-- 头部区域（可配合layui 已有的水平导航） -->\n' +
        '    <ul class="layui-nav layui-layout-left">\n' +
        '      <li class="layui-nav-item"><a href="">nav 1</a></li>\n' +
        '      <li class="layui-nav-item"><a href="">nav 2</a></li>\n' +
        '      <li class="layui-nav-item"><a href="">nav 3</a></li>\n' +
        '      <li class="layui-nav-item">\n' +
        '        <a href="javascript:;">nav groups</a>\n' +
        '        <dl class="layui-nav-child">\n' +
        '          <dd><a href="">menu 11</a></dd>\n' +
        '          <dd><a href="">menu 22</a></dd>\n' +
        '          <dd><a href="">menu 33</a></dd>\n' +
        '        </dl>\n' +
        '      </li>\n' +
        '    </ul>\n' +
        '    <ul class="layui-nav layui-layout-right">\n' +
        '      <li class="layui-nav-item">\n' +
        '        <a href="javascript:;" class="orange-title-name">\n' +
        '          <img src="'+ path + user_name +'" class="layui-nav-img">\n' +
        '          ' + user_name + '\n' +
        '        </a>\n' +
        '        <dl class="layui-nav-child">\n' +
        '          <dd><a href="">用户资料</a></dd>\n' +
        '          <dd><a href="/user/user-information/update.html">修改信息</a></dd>\n' +
        '        </dl>\n' +
        '      </li>\n' +
        '      <li class="layui-nav-item"><a class="orange-login-out" onclick="delete_cookie()">退出登录</a></li>\n' +
        '    </ul>'

    let side_html = '    <div class="layui-side-scroll" style="background-color: '+ color_matching + '">\n' +
        '      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->\n' +
        '      <ul class="layui-nav layui-nav-tree"  lay-filter="test" style="background-color: '+ color_matching + '">\n' +
        '        <li class="layui-nav-item"><a href="/index.html"' + cas_this1 + '><img src="/image/仪表盘.png" width="20" height="20">仪表盘</a></li>\n' +
        '        <li class="layui-nav-item' + cas_item1 + '">\n' +
        '          <a class="" href="javascript:;"><img src="/image/资产管理.png" width="20" height="20">资产管理</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/property/property-hostlist.html"' + cas_item_this1 + '><img src="/image/juzi11.png" width="20" height="20">资产列表</a></dd>\n' +
        '            <dd><a href="/property/property-userlist.html"' + cas_item_this3 + '><img src="/image/juzi11.png" width="20" height="20">系统用户</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item' + cas_item3 + '">\n' +
        '          <a href="javascript:;"><img src="/image/执行日志.png" width="20" height="20">操作中心</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/operation/operation-batchscript.html"' + cas_item_this6 + '><img src="/image/juzi11.png" width="20" height="20">批量脚本</a></dd>\n' +
        '            <dd><a href="/operation/operation-batchcommand.html"' + cas_item_this7 + '><img src="/image/juzi11.png" width="20" height="20">批量命令</a></dd>\n' +
        '            <dd><a href="/osh/shell.html" target="_blank"><img src="/image/juzi11.png" width="20" height="20">shell终端</a></dd>\n' +
        '            <dd><a href="/operation/operation-codesync.html"' + cas_item_this8 + '><img src="/image/juzi11.png" width="20" height="20">代码同步</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item' + cas_item4 + '">\n' +
        '          <a href="javascript:;"><img src="/image/容器.png" width="20" height="20">容器管理</a>\n' +
        '          <dl class="layui-nav-child">\n' +
        '            <dd><a href="/container/container-imagelist.html"' + cas_item_this9 + '><img src="/image/juzi11.png" width="20" height="20">镜像列表</a></dd>\n' +
        '            <dd><a href="/container/container-dockerlist.html"' + cas_item_this10 + '><img src="/image/juzi11.png" width="20" height="20">容器列表</a></dd>\n' +
        '            <dd><a href="/container/container-kubernetes.html"' + cas_item_this11 + '><img src="/image/juzi11.png" width="20" height="20">kubernetes</a></dd>\n' +
        '          </dl>\n' +
        '        </li>\n' +
        '        <li class="layui-nav-item"><a href="/filetransfer.html"' + cas_this3 + '><img src="/image/文件.png" width="20" height="20">文件传输</a></li>\n' +
        '        <li class="layui-nav-item"><a href="/settings.html"' + cas_this4 + '><img src="/image/设置.png" width="20" height="20">系统设置</a></li>\n' +
        '      </ul>\n' +
        '    </div>'

    $(".layui-header").html(head_html)
    $(".layui-side").html(side_html)
    // 重新渲染整个页面
    // layui.element.init()
    layui.element.render('nav')
    layui.element.render('breadcrumb')
}


$(function () {
    let url_local = window.location.protocol + window.location.host + '/login.html'
    // document.write(returnCitySN["cip"]+','+returnCitySN["cname"])
    if ($.cookie('username') === undefined) {
        window.location.href = '/login.html'
    } else {
        // $(".orange-title-name").html($(".orange-title-name").html().replace("admin",$.cookie('username')))
        // $('.layui-header').css('background-color', '#2261A1')
    }
});

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

function orange_alert(time, msg) {
    layer.alert(msg, {
        time: time * 1000
        , success: function (layero, index) {
            var timeNum = this.time / 1000, setText = function (start) {
                layer.title((start ? timeNum : --timeNum) + ' 秒后关闭', index);
            };
            setText(!0);
            this.timer = setInterval(setText, 1000);
            if (timeNum <= 0) clearInterval(this.timer);
        }
        , end: function () {
            clearInterval(this.timer);
        }
    });
}

function undata(obj) {
    if (obj[0] !== undefined) {
        let undata0 = obj[0]['children']
        let msg_data = []
        for (let i = 0; i < undata0.length; i++) {
            let undata1 = undata0[i]['children']
            for (let y = 0; y < undata1.length; y++) {
                // let undata2 = undata1[y]['title']
                let undata2 = undata1[y]['id']
                msg_data.push(undata2)
            }
        }
        return msg_data
    } else {
        return 0
    }
}


function get_group_name_list() {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/host/group/name_list",
        dataType: "JSON",
        data: {'name': $.cookie('username')},
        success: function (res) {
            let data_name = res['group_name_list_msg']
            let option = '';
            for (let i = 0; i < data_name.length; i++) {
                option += "<option value='" + data_name[i] + "'>" + data_name[i] + "</option>";
            }
            $("#orange_group").html(option);
            layui.form.render('select')
        }
    })
}

function get_user_auth_list(page_html) {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/account/user/auth_list",
        dataType: "JSON",
        // async: false,
        data: {'name': $.cookie('username')},
        success: function (res) {
            let user_auth = res['usrole']
            if (user_auth === 'admin') {
                upload_layui_admin(page_html)
            } else if (user_auth === 'develop'){
                upload_layui_develop(page_html)
            }
        }
    })
}

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
            layui.tree.render({
                elem: '#orange-fx1'
                , id: 'demoId1'
                , data: data
                , showCheckbox: true
            });
        }
    })
}

function delete_cookie() {
    $.removeCookie('username')
    window.location.href = '/login.html'
}
