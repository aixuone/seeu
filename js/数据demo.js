// 折线 二维 
xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [820, 932, 901, 934, 1290, 1330, 1320],
		type: 'line'
	}]
// 折线 多维
legend: {
		data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
	},
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: '邮件营销',
		type: 'line',
		stack: '总量',
		areaStyle: {
			normal: {}
		},
		data: [120, 132, 101, 134, 90, 230, 210]
	}, {
		name: '联盟广告',
		type: 'line',
		stack: '总量',
		areaStyle: {
			normal: {}
		},
		data: [220, 182, 191, 234, 290, 330, 310]
	}, {
		name: '视频广告',
		type: 'line',
		stack: '总量',
		areaStyle: {
			normal: {}
		},
		data: [150, 232, 201, 154, 190, 330, 410]
	}, {
		name: '直接访问',
		type: 'line',
		stack: '总量',
		areaStyle: {
			normal: {}
		},
		data: [320, 332, 301, 334, 390, 330, 320]
	}, {
		name: '搜索引擎',
		type: 'line',
		stack: '总量',
		label: {
			normal: {
				show: true,
				position: 'top'
			}
		},
		areaStyle: {
			normal: {}
		},
		data: [820, 932, 901, 934, 1290, 1330, 1320]
	}]


// 柱形图 二维
xAxis: [{
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		axisTick: {
			alignWithLabel: true
		}
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: '直接访问',
		type: 'bar',
		barWidth: '60%',
		data: [10, 52, 200, 334, 390, 330, 220]
	}]
//柱形图 三维
xAxis: [{
		type: 'category',
		axisTick: {
			show: false
		},
		data: ['2012', '2013', '2014', '2015', '2016']
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: 'Forest',
		type: 'bar',
		barGap: 0,
		label: labelOption,
		data: [320, 332, 301, 334, 390]
	}, {
		name: 'Steppe',
		type: 'bar',
		label: labelOption,
		data: [220, 182, 191, 234, 290]
	}, {
		name: 'Desert',
		type: 'bar',
		label: labelOption,
		data: [150, 232, 201, 154, 190]
	}, {
		name: 'Wetland',
		type: 'bar',
		label: labelOption,
		data: [98, 77, 101, 99, 40]
	}]

// 折线加柱形图
legend: {
		data: ['蒸发量', '降水量', '平均温度']
	},
	xAxis: [{
		type: 'category',
		axisTick: {
			alignWithLabel: true
		},
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	}],
	yAxis: [{
		type: 'value',
		name: '蒸发量',
		min: 0,
		max: 250,
		position: 'right',
		axisLine: {
			lineStyle: {
				color: colors[0]
			}
		},
		axisLabel: {
			formatter: '{value} ml'
		}
	}, {
		type: 'value',
		name: '降水量',
		min: 0,
		max: 250,
		position: 'right',
		offset: 80,
		axisLine: {
			lineStyle: {
				color: colors[1]
			}
		},
		axisLabel: {
			formatter: '{value} ml'
		}
	}, {
		type: 'value',
		name: '温度',
		min: 0,
		max: 25,
		position: 'left',
		axisLine: {
			lineStyle: {
				color: colors[2]
			}
		},
		axisLabel: {
			formatter: '{value} °C'
		}
	}],
	series: [{
		name: '蒸发量',
		type: 'bar',
		data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	}, {
		name: '降水量',
		type: 'bar',
		yAxisIndex: 1,
		data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	}, {
		name: '平均温度',
		type: 'line',
		yAxisIndex: 2,
		data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	}]