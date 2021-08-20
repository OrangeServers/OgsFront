// url配置
// const ogs_backend_url = 'http://10.0.1.198:18000'
const ogs_backend_url = ''

// 初始化程序
if (window.location.pathname !== '/error.html') {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/init",
        dataType: "JSON",
        data: {'status': 'ogsfront'},
        success: function (res) {
            if (res['status'] === 200) {
                console.log('连接成功')
            }
        },
        error: function (xhr, errorText, errorType) {
            if (xhr.status !== 200 && xhr.status !== 302) {
                window.location.href = '/error.html'
            }
        }
    })
}