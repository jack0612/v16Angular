


import { Component, Input, OnInit, ElementRef } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'line-chart',
  template: `
  <div echarts [options]="chartOption"  class="demo-chart"></div>
`,

})

export class LineChartComponent {


  chartOption: EChartsOption = {
    // showGridLines:true,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      splitLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        console.log('line-chart:params', params)
        return `<b>${params['name']}</b> : $ ${params['value']}`;
      }
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680, 1890, 2300],
      type: 'line',
      areaStyle: {}
    },
    {
      data: [900, 2000],
      type: 'line',
      areaStyle: {}
    },
    ]
  }


}
