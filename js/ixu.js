var _base = {
	basePath : "http://192.168.60.185:8080/",//服务器地址
	userId : 1, //用户id
	xinfo :[], //保存 候选字段列表

}
var CHART;//表单

$(function(){
	getSYS();
});

var getSYS = function(){
	//登录成功 获取系统DBS列表
	$.ajax({
		type: 'GET',
		url: _base.basePath + "dataSets/"+_base.userId,
		dataType: 'json',
		data:{
			token: 'atoken'
		},
		success: function(res) { //返回list数据并循环获取
			
			if(res.success!='true'){
				alert('获取数据集列表失败。');
				return;
			}
			console.log('根据用户权限获取数据集列表成功');
			console.log(res);
			// 隐藏loading
			$("#_loading").hide();
			var select = $("#DBSselect");
			var options = '<option>请选择数据集</option>';
			var data = res.data;
			for (var i = 0; i < data.length; i++) {
				options += ("<option value='" + data[i].dataSetID + "'>" +
					data[i].dataSetName + "："+data[i].dataSetType+"</option>");
			}
			select.html(options);
		},
		error: function(err) {
			console.log('获取数据集列表失败,原因:' + err);
		}
	});
}

//选择DBS后 出现系统下层表  onchange事件
// $("#DBSselect").bind('onchange',DBSselect());
function DBSselect() {
	//出现loading
	$("#_loading").show();
	var e = $("#DBSselect");
	$('#DBSselect option:eq(0)').attr('disabled', 'disabled').addClass('disabeld');
	var dataSetID = e.val();
	$.ajax({
		type: 'GET',
		url: _base.basePath + "dataSets/"+dataSetID+"/columns",
		dataType: 'json',
		data: {
			dataSetID: dataSetID
		},
		success: function(res) { //返回list数据并循环获取
			if(!res){
				alert('获取数据集字段列表失败。');
				return;
			}			
			console.log('获取数据集字段列表成功');
			console.log(res);
			_base.xinfo = res;//保存字段列表
			// 隐藏loading
			$("#_loading").hide();
			
		},
		error: function(err) {
			console.error('获取数据表失败,原因:' + err);
		}
	});
	//下拉数据加载
}


// 添加候选字段列表
var INFOLIST = function(e){
		var XINFO = $(e);
		var options = '<select name="" id="XINFOselect" class="span12" onchange="XINFOselect(this)"><option>请选择数据表</option>';
		for (var i = 0; i < _base.xinfo.length; i++) {
			options += ("<option value='" + _base.xinfo[i].columnID + "'>" +
				_base.xinfo[i].columnName + "</option>");
		}
		options += '</select>';
		XINFO.removeClass("hide").html(options);	
}





//表单设置窗口
	//打开表单设置窗口
	var showSetChartWin = function(showtype,option,filter){
		if (showtype){
			var $set = $('#chartset');
			if (showtype == 'add') {
				$set.empty();
				var chartset = document.getElementById('eg_chartset').innerHTML;
				$set.append(chartset);

				INFOLIST($(".chartValue"));
				INFOLIST($(".chartX"));
				INFOLIST($('.chartfilter'))
				$('.chartSeries').each(function(index, el) {
					INFOLIST($(this));
				});
				caozuo();
			}
		}
		if (option) {

		}
		if (filter) {

		}
		$('#chartset').slideDown();
	}
	//关闭 表单设置窗口
	var hideSetChartWin = function(){
		$('#chartset').hide();
	}
	//绑定 添加系列 添加筛选条件 操作
	var caozuo = function(){
		//添加 系列
		$('#seriesAdd').on('click',function(){
			var serires = document.getElementById('eg_series').innerHTML;
			$('#serieslist').append(serires);
			var e = $('#serieslist').find(".chartSeries").last();
			INFOLIST(e);
		});	
		//添加 筛选条件
		$('#filterAdd').on('click',function(){
			var serires = document.getElementById('eg_filter').innerHTML;
			$('#filterlist').append(serires);
			var e =$('#filterlist').find(".chartfilter").last();
			INFOLIST(e);
		});		
	}
	//生成表单
var _id = 1;
	var setChart = function(){
		var $id = $clone.attr('id');
		var o = {
			id : $id,
			title : $("#chartTitle").val(),
			theme : $('#chartTheme').val(),
			value : $('.chartValue').val(),
			valueOPT: $('.chartValueOpt').val(),
			x : $('.chartX').val(),
			xOPT: $('.chartXOpt').val(),
			series: [
				$('.chartSeries').val()
			],
			seriesOPT:[
				$('.chartSeriesOpt').val()
			]
		};		
		var opt = ofn($id);
		if (opt.type=='edit') {
			CHART[index] = o;
		}
		if(opt.type=='add'){		
			CHART.push(o);
		}
		
	}
	// 判断本地是否存储了 该表单设置
	var ofn = function($id){
		for(i in CHART){
			if(CHART[i].id == $id){
				return {index : i , type : 'edit'};
			} 
			return { type : 'add'}
		}		
	} 



//数据穿透

var shoot={
	arr:[
		// {
		// 	element: ['dom','dom'],//绑定的DOM
		// 	value : 'value'//监听的字段
		// }
	],
	val :1
};
Object.defineProperties(shoot,{
	values:{
        configurable:true,
        enumerable:true,
        writable:true,
        value:1
    },
    elements:{
        configurable:true,
        enumerable:true,
        writable:true,
        value:1
    },
	setting :{
		enumerable:true,
        get:function (){
			chartRefresh(this.elements);
			return;
        },
        set:function (val){
			if(!val){
				console.log('没有穿透字段数据传入系统');
				return ;
			}
			this.elements = val;
			console.log(this.elements);
			chartRefresh(this.elements);
			return;
        }
	}
});
var chartRefresh = function(arr){
	console.log(++shoot.val);
}