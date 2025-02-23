const SHOW_FORMAT = "YYYY-MM-DD";

// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';

// Import bar charts, all suffixed with Chart
import { LineChart, PieChart, BarChart, FunnelChart } from 'echarts/charts';

// Import the title, tooltip, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

import {$} from 'jquery';
import moment from 'moment';
import underscore from 'underscore';
import * as bootstrap from 'bootstrap';
import daterangepicker from 'daterangepicker';
export { $, moment, underscore, bootstrap, daterangepicker };

export function configChart(dailyVisits, titleTop100, domainTop100, keyword) {
  // Register the required components
  echarts.use([
    BarChart,
    LineChart,
    PieChart,
    FunnelChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);

  initCharts(dailyVisits, titleTop100, domainTop100, keyword)
}

export function initCharts(dailyVisits, titleTop, domainTop, keyword) {
  initDailyVisits(dailyVisits, keyword);
  initTop10(titleTop, 'titleTop10', 'TOP10 sites(by title)');
  initTop10(domainTop, 'domainTop10', 'TOP10 sites(by domain)');
}

export function initDailyVisits(dailyVisits, keyword) {
  //--- Trend Chart ---
  var dailyVisitsChart = echarts.init(document.getElementById('dailyVisits'));
  dailyVisitsChart.setOption({
    color: ['#23B7E5'],
    title : {
      text : 'Daily PV',
      subtext : 'Click any node to view details'
    },
    tooltip : {
      trigger: 'item',
      formatter : function (params) {
        return `${moment(params.value[0]).format(SHOW_FORMAT)} <br/> PV: ${params.value[1]}`;
      }
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: true, readOnly: false},
        magicType : {show: true, type: ['line', 'bar']},
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    dataZoom: {
      show: true,
      start : 0
    },
    legend : {
      data : ['Page View']
    },
    grid: {
      y2: 100
    },
    xAxis : [
      {
        type : 'time',
        splitNumber: 10
      }
    ],
    yAxis : [
      {
        name: 'PV',
        type : 'value'
      }
    ],
    series : [
      {
        name: 'Page View',
        type: 'line',
        showAllSymbol: true,
        symbolSize: function (value){
          return Math.round(value[1]/100) + 2;
        },
        data: (function () {
          return _.map(dailyVisits, function(visit) {
            return [new Date(visit[0]), visit[1]];
          });
        })()
      }
    ]
  });
  dailyVisitsChart.on('click', 'series', function(params) {
    let url = `/details/${moment(params.value[0]).format(SHOW_FORMAT)}?keyword=${keyword}`;
    window.open(url, '_blank');
  });

}

export function initTop10(topItems, eleId, title) {
  var URLsPercentChart = echarts.init(document.getElementById(eleId));
  var topLimit = topItems.length < 10 ? topItems.length : 10;
  var top10DataSource = [];
  var top10Titles = [];
  for (var i = 0; i < topLimit; i++) {
    var head = topItems[i][0];
    head = head.length > 50 ? head.substring(0, 50) : head;
    top10Titles.push(head);
    top10DataSource.push({value: topItems[i][1], name: head});
  }
  URLsPercentChart.setOption({
    title : {
      text: title,
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient : 'vertical',
      x : 'left',
      data: top10Titles
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: true, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    calculable : true,
    series : [
      {
        name:'Title: ',
        type:'pie',
        radius : '75%',
        center: ['50%', '60%'],
        data: top10DataSource
      }
    ]
  });
}

export function chooseDaterangeCB(start, end) {
  $('#browse_range span').html(`${start.format(SHOW_FORMAT)} - ${end.format(SHOW_FORMAT)}`);
}

export function ohsearchIndex() {
  let kw = $('#keyword').val();
  let range = $('#browse_range').data('daterangepicker');

  window.location = `/?start=${range.startDate.format(SHOW_FORMAT)}&end=${range.endDate.format(SHOW_FORMAT)}&keyword=${encodeURIComponent(kw)}`;
}
