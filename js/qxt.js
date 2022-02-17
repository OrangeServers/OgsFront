function get_count_list() {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/count_list_all",
        dataType: "JSON",
        async: false,
        success: function (res) {
            if (res['code'] === 0) {
                $('.orange-sl1').html(res['host_len'])
                $('.orange-sl2').html(res['container_len'])
                $('.orange-sl3').html(res['user_len'])
                $('.orange-sl4').html(res['group_len'])

                count_data = [{
                    "country": "组数量",
                    "litres": res['group_len']
                }, {
                    "country": "用户数量",
                    "litres": res['user_len']
                }, {
                    "country": "资产数量",
                    "litres": res['host_len']
                }, {
                    "country": "容器数量",
                    // "litres": 0
                    "litres": res['container_len']
                }]

            } else if (res['code'] === 201) {
                layer.alert('数据获取接口错误')
            }
        }
    })
}

layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    get_user_auth_list('index')


    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/account/user/auth_list",
        dataType: "JSON",
        success: function (res) {
            if (res['usrole'] !== 'admin') {
                $(".orange-sl3,.orange-sl4").attr('href', '/index.html')
            }
        }
    })

// Themes end
    // 更新当天数据
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/chart/update",
        dataType: "JSON",
        async: false,
        success: function (res) {
            console.log(res)
        }
    })

// Themes begin
// Themes end

    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/local/chart/count",
        dataType: "JSON",
        async: false,
        success: function (res) {
            if (res['code'] === 0) {
                window.login_data = res['login_msg']
                window.user_data = res['user_msg']
                window.date_data = res['date_msg']
            } else if (res['code'] === 201) {
                console.log('数据获取接口错误')
            }
        }
    })

    var chartDom2 = document.getElementById('zhexiandiv');
    var myChart2 = echarts.init(chartDom2);
    var option2;

    option2 = {
        title: {
            text: '登录统计',
            // subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['登录次数', '活跃用户']
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {show: true, type: ['stack', 'tiled']},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date_data
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '登录次数',
                type: 'line',
                // 平滑折线图修改为基础折线图
                // smooth: true,
                data: login_data
            },
            {
                name: '活跃用户',
                type: 'line',
                // smooth: true,
                data: user_data
            }
        ]
    };
    option2 && myChart2.setOption(option2);

    var chartDom = document.getElementById('bingtudiv');
    var myChart = echarts.init(chartDom);
    var option;

    get_count_list()

    option = {
        title: {
            text: '资产占比统计',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: $('.orange-sl4').text(), name: '组数量'},
                    {value: $('.orange-sl3').text(), name: '用户数量'},
                    {value: $('.orange-sl1').text(), name: '资产数量'},
                    {value: $('.orange-sl2').text(), name: '容器数量'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);

});
