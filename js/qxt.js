function get_count_list() {
    $.ajax({
        type: "POST",
        url: ogs_backend_url + "/server/count_list_all",
        dataType: "JSON",
        async: false,
        success: function (res) {
            if (!res['code']) {
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

            } else {
                layer.alert('数据获取接口错误')
            }
        }
    })
}

//折线图js文件
am4core.ready(function () {

    get_user_auth_list('index')

    $(".orange-sl3,.orange-sl4").attr('href', '/index.html')

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
            window.login_data = res['login_msg']
            window.user_data = res['user_msg']
        }
    })


// Create chart instance
    var chart = am4core.create("zhexiandiv", am4charts.XYChart);

// Enable chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

// Enable scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

// Add data
    chart.data = window.login_data

// Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = "MMM dd, yyyy";
    dateAxis.dateFormats.setKey("day", "dd");

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeDasharray = 3;
    series.strokeWidth = 2
    series.strokeOpacity = 0.3;
    series.strokeDasharray = "3,3"

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color("#fff");
    bullet.setStateOnChildren = true;
    bullet.propertyFields.fillOpacity = "opacity";
    bullet.propertyFields.strokeOpacity = "opacity";

    var hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 1.7;

    function createTrendLine(data) {
        var trend = chart.series.push(new am4charts.LineSeries());
        trend.dataFields.valueY = "value";
        trend.dataFields.dateX = "date";
        trend.strokeWidth = 2
        trend.stroke = trend.fill = am4core.color("#4cb450");
        trend.data = data;

        var bullet = trend.bullets.push(new am4charts.CircleBullet());
        bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
        bullet.strokeWidth = 2;
        bullet.stroke = am4core.color("#fff")
        bullet.circle.fill = trend.stroke;

        var hoverState = bullet.states.create("hover");
        hoverState.properties.scale = 1.7;

        return trend;
    };

    createTrendLine(window.user_data);
// let lastTrend = createTrendLine()
// // var lastTrend = createTrendLine(window.user_data);
//
// // Initial zoom once chart is ready
// lastTrend.events.once("datavalidated", function(){
//   series.xAxis.zoomToDates(new Date(2021, 7, 2), new Date(2021, 7, 13));
// });

}); // end am4core.ready()


//饼图js文件

am4core.ready(function () {

// Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
    var chart = am4core.create("bingtudiv", am4charts.PieChart);

// Add data
    get_count_list()
    chart.data = count_data
// chart.data = [ {
//   "country": "组数量",
//   "litres": $('.orange-sl4').text()
// }, {
//   "country": "用户数量",
//   "litres": $('.orange-sl3').text()
// }, {
//   "country": "资产数量",
//   "litres": $('.orange-sl1').text()
// }, {
//   "country": "容器数量",
//   // "litres": 0
//   "litres": $('.orange-sl2').text()
// } ];

// Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

});
