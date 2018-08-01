var dom_chart;
// 指定图表的配置项和数据
var option = {
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },    
    title: {
        text: '挖掘机保有量'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data:['2007','2008','2009']
    },
    xAxis: {
        data: ["挖掘机1","挖掘机2","挖掘机3","挖掘机4","挖掘机5","挖掘机5"]
    },
    yAxis: { type: 'value'},
    series: [{
        name: '2007',
        type: 'bar',
        barGap: 0,
        data: [5, 20, 36, 10, 10, 20]
    }
    ]
};

// 创建表格
function createChart(e){
        $(e).hide();
        var $this = $(e).siblings('.setChart');
         $this.hide().parent().siblings(".demoChart").css('height','300px');
        // 基于dom，初始化echarts实例
        var mychart = echarts.init($this.parent().siblings(".demoChart")[0]);
        // 使用刚指定的配置项和数据显示图表。
        mychart.setOption(option);
}
function createChartB(e){
        $(e).hide();
        var $this = $(e).siblings('.setChart');
        $this.hide().parent().siblings(".demoChart").css('height','300px');
        // 基于dom，初始化echarts实例
        var mychart = echarts.init($this.parent().siblings(".demoChart")[0]);
        // 使用刚指定的配置项和数据显示图表。
        option = {
            title : {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series:[{
                name:'面积模式',
                type:'pie',
                roseType : 'area',
                data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                    {value:20, name:'rose5'},
                    {value:35, name:'rose6'},
                    {value:30, name:'rose7'},
                    {value:40, name:'rose8'}
                ]
            }]
        };
        mychart.setOption(option); 
}
// 选择不同的一级条件出来不同的二级条件
function fn_select(e){
    var  v = e.value;
    $(e).siblings('h4').text("请选择二级条件");
    switch(v){
        case '1': v1(e);break;
        case '2': v2(e);break;
        case '3': v2(e);break;
        default: 
            $(e).siblings(".setChart2").empty();
            $(e).siblings('h4').text("请选择查询的数据类");
            $(e).parent().siblings(".createChart").hide();
            return;
    }
}
// 不同的思维导图 出现不同的二级条件
function v1(e){
    $(e).siblings(".setChart2").empty();
    $(e).parent().siblings(".createChart").show();

    var names_1="省份(全部),北京,河北省,山西省";
    var values_1="0,1,2,3";
    var title_1= "area";
    crtSelect(title_1,names_1,values_1,e);

    var names_2="品牌(全部),小松,三一,神钢";
    var values_2="0,1,2,3";
    var title_2= "brand";   
    crtSelect(title_2,names_2,values_2,e);

    var names_3="吨级(全部),0-6t,6-10t,10-11t";
    var values_3="0,1,2,3";
    var title_3= "t";   
    crtSelect(title_3,names_3,values_3,e);    

    var names_4="年份(全部),2006,2007,2008";
    var values_4="0,1,2,3";
    var title_4= "years";   
    crtSelect(title_4,names_4,values_4,e);    
}
function v2(e){
    $(e).siblings(".setChart2").empty();
    $(e).parent().siblings(".createChart").show();
    var names_1="条件1(全部),备选1,备选2,备选3,备选4,备选5";
    var values_1="0,1,2,3,4,5";
    var title_1= "area";
    crtSelect(title_1,names_1,values_1,e);

    var names_2="条件2(全部),备选1,备选2,备选3,备选4,备选5";
    var values_2="0,1,2,3,4,5";
    var title_2= "brand";   
    crtSelect(title_2,names_2,values_2,e);

    var names_3="条件3(全部),备选1,备选2,备选3,备选4,备选5";
    var values_3="0,1,2,3,4,5";
    var title_3= "t";   
    crtSelect(title_3,names_3,values_3,e);     
}

// 创建思维导图按钮
function crtSelect(title,names,values,e){
    var _values = values.split(",");
    var _names = names.split(",");
    var options ='';
    for (var i in _names) {
       options += '<option value="'+_values[i]+'">'+_names[i]+'</option>';
    }

    var select ='<select style="width: 120px;margin:5px;">'
               + options
               + '</select>'
               +'<input type="checkbox" name="x1" value="'+title+'">';
    $(e).siblings(".setChart2").append(select);
}


// 出现 后台输入 思维导图按钮
function showBackset(e){
    $(e).siblings('.backset').show();
    $(e).hide().siblings('.hand-in').hide();
}


// 出现 数据输入界面 在右侧弹出
function hand_in(e){
    $(e).hide().siblings('.click-in').hide();
    $('.main-content').css("padding-right","500px");
    $(".chartset-content").show();
    dom_chart = $(e);
}
//隐藏 数据输入界面
function close_hand_in(){
    $('.main-content').css("padding-right","0px");
    $(".chartset-content").hide();
}
function handInChart(e){
    var xname = [],
        yname =[],
        yt=[];
    var th = $("#chartable th input");
    for(var i in th){
        var v = th[i].value;
        if (v==undefined||v.length == 0){break;}
        xname.push(v);
    }
    option.xAxis.data = xname;
    
    var tr= $("#chartable tr");
    for(var j=0;j<tr.length;++j){
        if(j==0) continue;
        var v = $(tr[j]).find("input");
        var length;
        var o = {name:'',data:[],type:'bar'};
        for(var k=0;k<v.length; ++k){
            if (v[k].value.length == 0){break;}          
            if(k == 0) {
                o.name = v[0].value;
                yname.push(v[0].value);
                length = yt.push(o); 
                continue;
            }
            yt[length-1].data.push(v[k].value);  
            // yt[length-1].push(o);           
        }
        
    }   
    option.legend.data = yname; 
    option.series = yt;

    console.log(option);

    $(dom_chart).siblings(".demoChart").css('height','300px');
        // 基于dom，初始化echarts实例
    var mychart = echarts.init(dom_chart.siblings(".demoChart")[0]);
        // 使用刚指定的配置项和数据显示图表。
        mychart.setOption(option);
}

