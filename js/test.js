layui.use(['jquery', 'xmSelect', 'element'], function () {
    let element = layui.element;

    // let cas_this = 'class="layui-this"'
    // 管理员权限页面渲染
    function upload_layui_admin(cas_this) {
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
            '          <img src="/image/juzi11.png" class="layui-nav-img">\n' +
            '          admin\n' +
            '        </a>\n' +
            '        <dl class="layui-nav-child">\n' +
            '          <dd><a href="">set 1</a></dd>\n' +
            '          <dd><a href="">set 2</a></dd>\n' +
            '        </dl>\n' +
            '      </li>\n' +
            '      <li class="layui-nav-item"><a class="orange-login-out" onclick="delete_cookie()">Sign out</a></li>\n' +
            '    </ul>'

        let side_html = '    <div class="layui-side-scroll">\n' +
            '      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->\n' +
            '      <ul class="layui-nav layui-nav-tree"  lay-filter="test">\n' +
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
        element.init()
    }

    // 非管理员权限的页面渲染
    function upload_layui_develop(cas_this) {
        let cas_this1 = '',
            cas_this3 = '',
            cas_this4 = ''

        let cas_item_this1 = '',
            cas_item_this2 = '',
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
        } else if (cas_this === 'property-grouplist') {
            cas_item1 = ' layui-nav-itemed'
            cas_item_this2 = 'class="layui-this"'
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
            '          <img src="/image/juzi11.png" class="layui-nav-img">\n' +
            '          admin\n' +
            '        </a>\n' +
            '        <dl class="layui-nav-child">\n' +
            '          <dd><a href="">set 1</a></dd>\n' +
            '          <dd><a href="">set 2</a></dd>\n' +
            '        </dl>\n' +
            '      </li>\n' +
            '      <li class="layui-nav-item"><a class="orange-login-out" onclick="delete_cookie()">Sign out</a></li>\n' +
            '    </ul>'

        let side_html = '    <div class="layui-side-scroll">\n' +
            '      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->\n' +
            '      <ul class="layui-nav layui-nav-tree"  lay-filter="test">\n' +
            '        <li class="layui-nav-item"><a href="/index.html"' + cas_this1 + '><img src="/image/仪表盘.png" width="20" height="20">仪表盘</a></li>\n' +
            '        <li class="layui-nav-item' + cas_item1 + '">\n' +
            '          <a class="" href="javascript:;"><img src="/image/资产管理.png" width="20" height="20">资产管理</a>\n' +
            '          <dl class="layui-nav-child">\n' +
            '            <dd><a href="/property/property-hostlist.html"' + cas_item_this1 + '><img src="/image/juzi11.png" width="20" height="20">资产列表</a></dd>\n' +
            '            <dd><a href="/property/property-grouplist.html"' + cas_item_this2 + '><img src="/image/juzi11.png" width="20" height="20">资产组</a></dd>\n' +
            '            <dd><a href="/property/property-userlist.html"' + cas_item_this3 + '><img src="/image/juzi11.png" width="20" height="20">系统用户</a></dd>\n' +
            '          </dl>\n' +
            '        </li>\n' +
            '        <li class="layui-nav-item' + cas_item3 + '">\n' +
            '          <a href="javascript:;"><img src="/image/执行日志.png" width="20" height="20">操作中心</a>\n' +
            '          <dl class="layui-nav-child">\n' +
            '            <dd><a href="/operation/operation-batchscript.html"' + cas_item_this6 + '><img src="/image/juzi11.png" width="20" height="20">批量脚本</a></dd>\n' +
            '            <dd><a href="/operation/operation-batchcommand.html"' + cas_item_this7 + '><img src="/image/juzi11.png" width="20" height="20">批量命令</a></dd>\n' +
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
        element.init()
    }


    upload_layui_develop('operation-batchcommand')

})