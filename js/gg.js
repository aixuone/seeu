//服务器地址
var basePath = "http://192.168.60.185:8080/";

var chartDemo = [];
var chartMenu = [];
var chartCont = [];

// 数据表 保存信息
var dataBase = [];
//预定义 图表存储内容 保存图表  重用图表用
/*
var dataObj = {
		// 区分图表 id
		id:'',
		sheet:{
			// 位置
			top: '',
			left: '',
			//大小
			width:'',
			height:''
		},
		option:{
			//表标题
			TITLE:'',
			// 系统id
			systemID:'',
			//数据表
			INFO:'',
			// 主题
			STYLE:'',		
			BUNDLE:[
				// {
				// 	//字段名称
				// 	field: '',	
				// 	// 聚合方式
				// 	polymerize: 'count',							
				// 	//维度名称
				// 	dimension: '',
				// 	//种类  bar line
				// 	type: ''
				// }
			]
		}
};
*/

//创建 图表设置项原型
function DataObj(obj) {
	// this.INDEX = '';
	this._init(obj);
	this._save();
}
DataObj.prototype = {
	_init: function(obj) {
		this.ID = obj.ID,
		this.TITLE = obj.TITLE,
		this.SYSTEM = obj.SYSTEM,
		this.INFO = obj.INFO,
		this.BUNDLE = obj.BUNDLE,
		this.SHEET = obj.sheet,
		this.STYLE = obj.STYLE
	},
	_save: function() {
		this.INDEX = dataBase.push(this);
	}
};

// 伪登录
// $(".main-content").show();
// 打开登录框
$("#logo").modal('show');
// 登录按钮绑定事件  隐藏登录框
$(function(){	
	$("#logo_btn").click(function(event) {
		event.preventDefault();
		/* Act on the event */
		$("#logo").modal('hide');
		$(".main-content").show();

	})
});

//登录成功 获取系统DBS列表
$.ajax({
	type: 'GET',
	url: basePath + "SYSTEMS",
	dataType: 'json',
	success: function(res) { //返回list数据并循环获取
		// 隐藏loading
		console.log('获取系统DBS列表成功');
		console.log(res);
		$("#_loading").hide();
		var select = $("#DBSselect");
		var options = '<option>请选择系统</option>';
		for (var i = 0; i < res.length; i++) {
			options += ("<option value='" + res[i].systemID + "'>" +
				res[i].systemName + "</option>");
		}
		select.html(options);
	},
	error: function(err) {
		console.log('获取系统列表失败,原因:' + err);
	}
});


//选择DBS后 出现系统下层表  onchange事件
// $("#DBSselect").bind('onchange',DBSselect());
function DBSselect() {
	//出现loading
	$("#_loading").show();
	var e = $("#DBSselect");
	$('#DBSselect option:eq(0)').attr('disabled', 'disabled').addClass('disabeld');
	$.ajax({
		type: 'GET',
		// url : basePath + "test",
		url: basePath + "INFOS",
		dataType: 'json',
		data: {
			SystemID: e.value
		},
		success: function(res) { //返回list数据并循环获取
			console.log('获取数据表成功');
			console.log(res);
			// 隐藏loading
			$("#_loading").hide();
			var XINFO = $("#XINFO");
			var options = '<select name="" id="XINFOselect" class="span12" onchange="XINFOselect(this)"><option>请选择数据表</option>';
			for (var i = 0; i < res.length; i++) {
				options += ("<option value='" + res[i].xInfoID + "'>" +
					res[i].xInfoName + "</option>");
			}
			options += '</select>';
			XINFO.removeClass("hide").html(options);
		},
		error: function(err) {
			console.error('获取数据表失败,原因:' + err);
		}
	});
	//下拉数据加载
}


//加载 维度列表   onchange事件
function XINFOselect(_e) {
	var e = window.event || _e;
	console.log('维度列表加载成功');
	console.log(e.value);
	// 出现loading
	$("#_loading").show();
	$('#XINFO option:eq(0)').attr('disabled', 'disabled').addClass('disabeld');
	$("#chartView").removeClass('hide');
	var DBS = $("#DBSselect").val();
	var XINFO = $("#XINFOselect").val();
	$.ajax({
		type: 'GET',
		url: basePath + "FIELDS/" + DBS + "/" + XINFO,
		dataType: 'json',
		success: function(res) { //返回list数据并循环获取

			// 本地存储 数据
			// chartDemo.push(obj);
			console.log(res);
			// 隐藏loading
			$("#_loading").hide();
			$("#chartView").removeClass('hide');
			chartMenu = res;
		},
		error: function(err) {
			console.error('维度列表加载失败，原因：' + err);
		}
	});

}

//选择 图标类型 然后 出现对应设置参数框
function switchChart(clone) {
	$clone = $(clone);
	var options = '';
	for (var i in chartMenu) {
		options += '<option value="' + chartMenu[i].metaID + '">' + chartMenu[i].metaName + '</option>';
	}
	optionX = '<option>请选择维度1条件</option>' + options;
	$clone.find('.xIndex').eq(0).html(optionX);
	optionY = '<option>请选择维度2条件</option>' + options;
	$clone.find('.xIndex').eq(1).html(optionY);
	switch ($clone.data("charttype")) {
		case 'list1':
			$clone.find(".saveChartItem").bind("click", $clone, function() {
				chartItem(1, 'bar')
			});
			// chartContFn();
			break;
		case 'list2':
			// var options = '';
			// for(var i in chartMenu){
			// 	options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			// }
			// optionX = '<option>请选择x轴条件</option>' + options;
			// $clone.find('.xIndex').html(optionX);
			// optionY = '<option>请选择y轴条件</option>' + options;
			// $clone.find('.xIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click", $clone, function() {
				chartItem(2, 'line')
			});
			break;
		case 'list3':
			// var options = '';
			// for(var i in chartMenu){
			// 	options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			// }
			// optionX = '<option>请选择图例</option>' + options;
			// $clone.find('.xIndex').html(optionX);
			// optionY = '<option>请选择展示的数据</option>' + options;
			// $clone.find('.xIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click", $clone, function() {
				chartItem(3, 'pie')
			});
			break;
		case 'list4':
			// var options = '';
			// for(var i in chartMenu){
			// 	options+='<option value="'+chartMenu[i].metaID+'">'+chartMenu[i].metaName+'</option>' ;
			// }
			// optionX = '<option>请选择图例</option>' + options;
			// $clone.find('.xIndex').html(optionX);
			// optionY = '<option>请选择展示的数据</option>' + options;
			// $clone.find('.xIndex').html(optionY);
			$clone.find(".saveChartItem").bind("click", $clone, function() {
				chartItem(4, 'scatter')
			});
			break;
		default:
			break;
	}
}

// 生成柱状图
function chartItem(int, type) {
	var _index = $clone.find('.xIndex');
	var polymerize = $clone.find('.polymerize');
	var bundle = [];
	for (var i = 0; i < _index.length; i++) {

		bundle.push({
			field: _index[i].value,
			polymerize: polymerize[i].value,
			type: type
		});
	}
	// var DBS = $("#DBSselect").val();
	// var XINFO = $("#XINFOselect").val();	

	//创建新 DataObj类  存储图表所需的设置
	var _title = $clone.find('input[data-chartitme=title]').val();
	var _system = $("#DBSselect").val();
	var _info = $("#XINFOselect").val();

	var o = new DataObj({
		ID: $clone.attr('id'),
		TITLE: _title,
		SYSTEM: _system,
		INFO: _info,
		BUNDLE: bundle,
		SHEET: {
			top: '',
			left: '',
			width: '',
			height: ''
		},
		STYLE: 'theme1'
	});
	$clone.find('.share.label').bind('click',function(){window.open("http://localhost:3000/show.html?dbid="+o.ID+"&w=500&h=400")})
	//根据类名 dataObj 找对应的database第几项
	$clone.addClass('dataObj' + o.INDEX);
	// 保存一下
	sessionStorage.database =  JSON.stringify(dataBase);

	//ajax 请求 获取字段对应的值 生成图表
	$.ajax({
		contentType: 'application/json',
		url: basePath + "CHART/DATA",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(o),
		success: function(chartCont) {
			console.log("success");
			var x1 = [],
				y1 = [];
			if (bundle[0].polymerize == 'GROUP') var x = bundle[0].field;
			else var x = bundle[0].polymerize + '_' + bundle[0].field;				
			// var x = bundle[0].field;
			if (bundle[1].polymerize == 'GROUP')
				var y = bundle[1].field;
			else var y = bundle[1].polymerize + '_' + bundle[1].field;
			for (var i in chartCont) {
				x1.push(chartCont[i][x]);
				y1.push(chartCont[i][y]);
			}
			switch (type) {

				case 'bar':
					;
				case 'line':
					var option = {
						// $clone.find('input[data-chartitme=title]').val()
						title: {
							text: $clone.find('input[data-chartitme=title]').val(),
							x: 'center'
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						legend: {
							x: 'right bottom',
							data: [y]
						},
						toolbox: {
							show: true,
							orient: 'vertical',
							left: 'right',
							top: 'center',
							feature: {
								// dataView: {show: true, readOnly: false},
								// magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						calculable: true,
						xAxis: {
							type: 'category',
							axisTick: {
								show: true
							},
							data: x1
						},
						yAxis: {
							type: 'category'
						},
						series: [{
							name: y,
							type: type,
							data: y1
						}]

					};
					break;
				case 'pie':
					var x1 = [],
						y1 = [],
						arr = [];
					if (bundle[0].polymerize == 'GROUP') var x = bundle[0].field;
					else var x = bundle[0].polymerize + '_' + bundle[0].field;									
					// var x = bundle[0].field;
					if (bundle[1].polymerize == 'GROUP')
						var y = bundle[1].field;
					else var y = bundle[1].polymerize + '_' + bundle[1].field;
					for (var i in chartCont) {
						x1.push(chartCont[i][x]);
						y1.push(chartCont[i][y]);
					}						
					for (var i in chartCont) {
						x1.push(chartCont[i][x]);
						var o = {
							name: '',
							value: ''
						};
						o.name = chartCont[i][x];
						o.value = chartCont[i][y];
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
						            restore: {show: true},
						            saveAsImage: {show: true}
						        }
						    },
						    calculable: true,
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
					break;
				case 'scatter': 
					// var x = bundle[0].field;
					if (bundle[0].polymerize == 'GROUP') var x = bundle[0].field;
					else var x = bundle[0].polymerize + '_' + bundle[0].field;									
					if (bundle[1].polymerize == 'GROUP') var y = bundle[1].field;
					else var y = bundle[1].polymerize + '_' + bundle[1].field;				
					var arr = []; 
					for(var i = 0;i<chartCont.length;i++){
						var r =[ Number(chartCont[i][x]),Number(chartCont[i][y])];
						arr.push(r);
					}
					var option = {
						title: {
							text: $clone.find('input[data-chartitme=title]').val(),
							x: 'center'
						},
						legend: {
							left: 'left',
							x: 'left',
							data: x1,
						},
						toolbox: {
							show: true,
							orient: 'vertical',
							left: 'right',
							top: 'center',
							feature: {
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						xAxis:{},
						yAxis:{
							type: 'time'
						},
						series:[{
							symbolSize: 5,
        					data: arr,
        					type: "scatter"
						}]
					}
			}
			$clone.find('.setChart').hide();
			$clone.find('.demoChart').show().height("300px").width("500px");
			var _theme =  $clone.find('.chartTheme')[0].value;
			echarts.dispose($clone.find('.demoChart')[0]);
			var mychart = echarts.init($clone.find('.demoChart')[0],_theme);
			mychart.setOption(option);


		},
		error: function(err) {
			// console.error(err);
			console.error(err.responseText);
		}

	});
}