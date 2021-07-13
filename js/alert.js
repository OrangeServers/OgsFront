//参数说明 id,文字,方法

//普通弹窗
function tc_alert(txt) {
    hsycms.alert('alert', txt, function () {
        hsycms.close('alert');
        console.log("点击了确定");
    })
}

//提示弹窗
function tips(txt) {
    hsycms.tips('tips', txt, function () {
        console.log("提示关闭后");
    }, 2000)
}

//询问弹窗
function confirm() {
    hsycms.confirm('confirm', '确定要这么做',
        function (res) {
            hsycms.success('success', '点击了确定');
        },
        function (res) {
            hsycms.error('error', '点击了取消');
        },
    )
}

//操作成功调用
function success(txt) {
    hsycms.success('success', txt, function () {
        console.log('操作成功关闭后');
    }, 1800)
}

//操作失败调用
function error(txt) {
    hsycms.error('error', txt, function () {
        console.log('操作失败关闭后');
    }, 1800)
}

//显示loading
function loading() {
    hsycms.loading('loading', '正在加载');
    //2秒后隐藏
    setTimeout(res => {
        hsycms.hideLoading('loading');
    }, 2000)
}
