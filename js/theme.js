(function (root, factory) {if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }

    var colorPalette = [
        '#C1232B','#27727B','#FCCE10','#E87C25','#B5C334',
        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
    ];

    var theme = {
        "seriesCnt": "4",
        "backgroundColor": "#ffffff",
        "titleColor": "#000000",
        "subtitleColor": "#777777",
        "textColorShow": false,
        "textColor": "#333",
        "markTextColor": "#ffffff",
        "color": [
            "#f9b406",
            "#0e1271",
            "#777777"
        ],
        "borderColor": "#777777",
        "borderWidth": "1",
        "visualMapColor": [
            "#f9b406",
            "#333333",
            "#333333"
        ],
        "legendTextColor": "#999999",
        "kColor": "#eb8146",
        "kColor0": "transparent",
        "kBorderColor": "#d95850",
        "kBorderColor0": "#58c470",
        "kBorderWidth": "2",
        "lineWidth": "2",
        "symbolSize": "6",
        "symbol": "emptyCircle",
        "symbolBorderWidth": "2",
        "lineSmooth": true,
        "graphLineWidth": 1,
        "graphLineColor": "#aaaaaa",
        "mapLabelColor": "#e07816",
        "mapLabelColorE": "rgb(232,202,49)",
        "mapBorderColor": "#999999",
        "mapBorderColorE": "#eb8146",
        "mapBorderWidth": 0.5,
        "mapBorderWidthE": 1,
        "mapAreaColor": "#f3f3f3",
        "mapAreaColorE": "rgba(255,178,72,1)",
        "axes": [
            {
                "type": "all",
                "name": "通用坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#aaaaaa",
                "axisTickShow": false,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#999999",
                "splitLineShow": true,
                "splitLineColor": [
                    "#e6e6e6"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            },
            {
                "type": "category",
                "name": "类目坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": false,
                "splitLineColor": [
                    "#ccc"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            },
            {
                "type": "value",
                "name": "数值坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": true,
                "splitLineColor": [
                    "#ccc"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            },
            {
                "type": "log",
                "name": "对数坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": true,
                "splitLineColor": [
                    "#ccc"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            },
            {
                "type": "time",
                "name": "时间坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": true,
                "splitLineColor": [
                    "#ccc"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        ],
        "axisSeperateSetting": false,
        "toolboxColor": "#999999",
        "toolboxEmpasisColor": "#666666",
        "tooltipAxisColor": "#cccccc",
        "tooltipAxisWidth": 1,
        "timelineLineColor": "#893448",
        "timelineLineWidth": 1,
        "timelineItemColor": "#893448",
        "timelineItemColorE": "#ffb248",
        "timelineCheckColor": "#eb8146",
        "timelineCheckBorderColor": "rgba(255,178,72,0.41)",
        "timelineItemBorderWidth": 1,
        "timelineControlColor": "#893448",
        "timelineControlBorderColor": "#893448",
        "timelineControlBorderWidth": 0.5,
        "timelineLabelColor": "#f5f5f7",
        "datazoomBackgroundColor": "rgba(255,255,255,0)",
        "datazoomDataColor": "rgba(255,178,72,0.5)",
        "datazoomFillColor": "rgba(255,178,72,0.15)",
        "datazoomHandleColor": "#ffb248",
        "datazoomHandleWidth": "100",
        "datazoomLabelColor": "#333333"
    };

    echarts.registerTheme('komatsu', theme);
}));