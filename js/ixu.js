// $('#chartView').removeClass('hide');


var basePath = "http://192.168.60.185:8080/";
var chartDemo = [];
var chartMenu = [];
var chartCont = [];
var DBS ;//选择的系统
var INFO; //选择的表
// $("#logo").modal('show'); 
$(".main-content").show();
//伪登录
$(function(){

	$("#logo_btn").click(function(event) {
		event.preventDefault();
		/* Act on the event */
		$("#logo").modal('hide');

		$(".main-content").show();

	});
//获取 系统DBS列表

	$.ajax({
		type : 'GET',
		url : basePath + "SYSTEMS",
		dataType : 'json',
		success : function(res) {//返回list数据并循环获取
			// 隐藏loading
			console.log(111);
			$("#_loading").hide();
				var select = $("#DBSselect");
				var options = '<option>请选择系统</option>';
				for (var i = 0; i < res.length; i++) {
					options+=("<option value='"+res[i].systemID+"'>"
							+ res[i].systemName + "</option>");
				}	
				select.html(options);	
			},
		error: function(err){
			console.log(err);
		}		
	});	
	
})
//选择DBS后 出现系统下层表 选择
function DBSselect(_e){
	//出现loading
	$("#_loading").show();
	var e =  window.event||_e;
	$('#DBSselect option:eq(0)').attr('disabled','disabled').addClass('disabeld');
	$.ajax({
		type : 'GET',
		// url : basePath + "test",
		url : basePath + "INFOS",
		dataType : 'json',
		data:{
			SystemID: e.value
		},
		success : function(res) {//返回list数据并循环获取
			console.log(res);	
			// 隐藏loading
			$("#_loading").hide();
			var XINFO = $("#XINFO");
			var options = '<select name="" id="XINFOselect" class="span12" onchange="XINFOselect(this)"><option>请选择数据表</option>';
			for (var i = 0; i < res.length; i++) {
					options+=("<option value='"+res[i].xInfoID+"'>"
							+ res[i].xInfoName + "</option>");
			}
			options+='</select>';	
				XINFO.removeClass("hide").html(options);			
		},
		error: function(err){
			console.error(err);
		}		
	});		
	//下拉数据加载
	
	
}

//加载 轴选项
function XINFOselect(_e){
	var e =  window.event||_e;
	console.log(e.value);
	// 出现loading
	$("#_loading").show();
	$('#XINFO option:eq(0)').attr('disabled','disabled').addClass('disabeld');
	$("#chartView").removeClass('hide');
	DBS = $("#DBSselect").val();
	XINFO = $("#XINFOselect").val();
	$.ajax({
		type : 'GET',
		url : basePath + "FIELDS/"+DBS+"/"+XINFO,
		dataType : 'json',
		success : function(res) {//返回list数据并循环获取
			var obj = {
				DBS : DBS,
				XINFO: XINFO
			};
			// 本地存储 数据
			chartDemo.push(obj);
			console.log(res);
			// 隐藏loading
			$("#_loading").hide();	
			$("#chartView").removeClass('hide');
			chartMenu = res;
		},
		error: function(err){
			console.error(err);
		}		
	});			
	
}



//选择 图标类型 然后 出现对应设置参数框
function switchChart(clone){
	$clone =$(clone);
	switch($clone.data("charttype")){
		case 'list1':
			var options = '';
			for(var i in chartMenu){
				options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			}
			optionX = '<option>请选择x轴条件</option>' + options;
			$clone.find('.xIndex').html(optionX);
			optionY = '<option>请选择y轴条件</option>' + options;
			$clone.find('.yIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click",$clone,chartItem1);
			// chartContFn();
			break;
		case 'list2':
			var options = '';
			for(var i in chartMenu){
				options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			}
			optionX = '<option>请选择x轴条件</option>' + options;
			$clone.find('.xIndex').html(optionX);
			optionY = '<option>请选择y轴条件</option>' + options;
			$clone.find('.yIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click",$clone,chartItem2);
			chartContFn2();	
			break;
		case 'list3':
			var options = '';
			for(var i in chartMenu){
				options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			}
			optionX = '<option>请选择图例</option>' + options;
			$clone.find('.xIndex').html(optionX);
			optionY = '<option>请选择展示的数据</option>' + options;
			$clone.find('.yIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click",$clone,chartItem3);
			// chartContFn();			
		break;
		case 'list4':
			var options = '';
			for(var i in chartMenu){
				options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			}
			optionX = '<option>请选择图例</option>' + options;
			$clone.find('.xIndex').html(optionX);
			optionY = '<option>请选择展示的数据</option>' + options;
			$clone.find('.yIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click",$clone,chartItem4);
			chartContFn2();	
			break;
		default : break;
	}	
}


// 生成柱状图
function chartItem1(e){
	var polymerize1 = $clone.find('.polymerize').eq(0).val();
	var polymerize2 = $clone.find('.polymerize').eq(1).val();
	var x = $clone.find('.xIndex').val();
	var y = $clone.find('.yIndex').val();
	var o = {
		SYSTEM:DBS,
		INFO:XINFO,
		BUNDLE:[
			{field:x,polymerize:polymerize1},
			{field:y,polymerize:polymerize2}
		],
		ORDER:[
			{field:x,type:''},
			{field:y,type:''}
		]
	};
	$.ajax({
		contentType: 'application/json',
		url: basePath + "CHART/DATA",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(o)
	})
	.done(function(chartCont) {
		console.log("success");	
		var x1 = [],y1 = [];
		for(var i in chartCont){
			x1.push(chartCont[i][x]);
			y1.push(chartCont[i][y]);
		}
		var option = {
			// $clone.find('input[data-chartitme=title]').val()
			title :{
				text:$clone.find('input[data-chartitme=title]').val(),
				x:'center'
			} ,
			tooltip: {
	       		 trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
	        legend: {
	        	x:'left',
	        	data: ['Forest']
		    },
		    toolbox: {
		        show: true,
		        orient: 'vertical',
		        left: 'right',
		        top: 'center',
		        feature: {
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
		    calculable: true,
		    xAxis: {
	            type: 'category',
	            axisTick: {show: true},
	            data: x1
	        },
		    yAxis: {
	            type: 'value'
	        },
	        series: [{
	            name: 'Forest',
	            type: 'bar',
	            data: y1
	        }]

		};
		$clone.find('.setChart').hide();
		$clone.find('.demoChart').show().height("300px");
		var mychart = echarts.init($clone.find('.demoChart')[0]);

		chartDemo.push(mychart);

		mychart.setOption(option);
	})
	.fail(function() {
		console.log("error");
	});	
}
// 获取对应曲线图的具体数据
function chartContFn2(){
	$.ajax({
		type : 'POST',
		url : basePath + "CHART/PREVIEW",
		dataType : 'json',
		data:{
			chartID: '123'
		},
		success : function(res) {//返回list数据并循环获取
			console.log(res);	
			chartCont = res;		
		},
		error: function(err){
			console.error(err);
		}		
	});	
}
// 生成曲线图
function chartItem2(e){
	// var x = $clone.find('.xIndex').val();
	// var y =$clone.find('.yIndex').val();
	var x1 = [],y1 = [];
	for(var i in chartCont){
		x1.push(chartCont[i]['FAILUREDATE']);
		y1.push(chartCont[i]['COUNT_BRAND']);
	}
	var option = {
		// $clone.find('input[data-chartitme=title]').val()
		title :{
			text:$clone.find('input[data-chartitme=title]').val(),
			x:'center'
		} ,
		tooltip: {
       		 trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
        legend: {
        	x:'left',
        	data: ['Forest']
	    },
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
	    calculable: true,
	    xAxis: {
            type: 'category',
            axisTick: {show: true},
            data: x1
        },
	    yAxis: {
            type: 'value'
        },
        series: [{
            name: 'Forest',
            type: 'line',
            smooth: true,
            data: y1
        }]

	};
	$clone.find('.setChart').hide();
	$clone.find('.demoChart').show().height("300px");
	var mychart = echarts.init($clone.find('.demoChart')[0]);

	chartDemo.push(mychart);

	mychart.setOption(option);
}
// 生成饼状图
function chartItem3(e){
	// var x = $clone.find('.xIndex').val();
	// var y =$clone.find('.yIndex').val();
	var x1 = [],y1 = [], arr=[];
	for(var i in chartCont){
		x1.push(chartCont[i]['BRAND']);
		var o = {name:'',value:""};
		o.name = chartCont[i]['BRAND'];
		o.value = chartCont[i]['COUNT_BRAND'];
		arr.push(o);
	}
	var option = {
		// $clone.find('input[data-chartitme=title]').val()
		title :{
			text:$clone.find('input[data-chartitme=title]').val(),
			x:'center'
		} ,
		tooltip: {
	       	trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)",
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
        legend: {       	
        	left: 'left',
        	x:'left',
        	data: x1,
	    },
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
        series: [{
            name: 'Forest',
            type: 'pie',
            data: arr,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]

	};
	$clone.find('.setChart').hide();
	$clone.find('.demoChart').show().height("300px");
	var mychart = echarts.init($clone.find('.demoChart')[0]);

	chartDemo.push(mychart);

	mychart.setOption(option);
}

// 生成散点图
function chartItem4(e){
	// var x = $clone.find('.xIndex').val();
	// var y =$clone.find('.yIndex').val();
	var x1 = [],y1 = [],arr=[],arr1=[];
	for(var i in chartCont){
		var r =[];
		r.push(chartCont[i]['FAILUREDATE']);
		r.push(chartCont[i]['COUNT_BRAND']);
		if (i<=3){arr1.push(r);continue;}
		arr.push(r);
	}
	// var option = {
	// 	// $clone.find('input[data-chartitme=title]').val()
	// 	title :{
	// 		text:$clone.find('input[data-chartitme=title]').val(),
	// 		x:'center'
	// 	} ,
	//     xAxis: {
 //        	scale: true
	//     },
	//     yAxis: {
	//         scale: true
	//     },
 //        series: [
	//         {	name: '1990',
	// 	        type: 'effectScatter',
	// 	        symbolSize: 20,
	// 	        data: arr1
	// 	    },
	// 	    {	name: '1990',
	//         	type: 'scatter',
	// 	        data: arr
	// 	    }
	//     ]

	// };
	var option = {
    title : {
        text:$clone.find('input[data-chartitme=title]').val(),
		x:'center'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer:{
            show: true,
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        }
    },
    legend: {
        data:['brand']
    },
    toolbox: {
        show : true,
		orient: 'vertical',
        left: 'right',
        top: 'center',        
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
        {
            type : 'log',
            scale:true,
            axisLabel : {
               
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
              
            }
        }
    ],
    series : [
        {
            name:'brand',
            type:'scatter',
            data: arr1,
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'brand',
            type:'scatter',
            data:arr,
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};
                    
	$clone.find('.setChart').hide();
	$clone.find('.demoChart').show().height("300px");
	var mychart = echarts.init($clone.find('.demoChart')[0]);

	chartDemo.push(mychart);

	mychart.setOption(option);
}



