


import { Component, Input, OnInit, ElementRef } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'line-chart',
  template: `
  <div echarts [options]="chartOption" aria-label="this is a"  class="demo-chart"></div>
`,

})

export class LineChartComponent {


  chartOption: EChartsOption = {
    aria: {
      enabled:true
    },
    textStyle: {
      fontFamily: 'Roboto, Arial, Verdana, sans-serif',
      fontSize: 24
    },
    // showGridLines:true,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      splitLine: {
        show: false,//true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    tooltip: [
      {
        //position :['right'],
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
          console.log('line-chart:params', params)
          return `
          <b>${params['name']}</b> : $ ${params['value']}
        <div><b>${params['name']}</b> : $ ${params['value']}</div>
        <div><b>${params['name']}</b> : $ ${params['value']}</div>
        <div><b>${params['name']}</b> : $ ${params['value']}</div>
        `;
        },
        textStyle: {
          fontSize: 13,
          fontFamily: 'Roboto, sans-serif'
        }
        ,
        axisPointer: {
          mainType: 'axisPointer',
          type: 'line',
        }
      },
      {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
          console.log('line-chart:params', params)
          return `aaaaaaaaaaaaa
        `;
        },
        textStyle: {
          fontSize: 13,
          fontFamily: 'Roboto, sans-serif'
        }
        ,
        axisPointer: {
          mainType: 'axisPointer',
          type: 'line',
        }
      }
    ],
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680, 1890, 2300],
        type: 'line',
        areaStyle: {},
        //https://github.com/apache/echarts/issues/11059 
        //https://stackoverflow.com/questions/64781894/echarts-how-to-set-different-symbol-for-different-marklines-in-one-chart
        markLine: {
          symbol: 'none',
          lineStyle: {
            width: 1,
            type: 'solid'
          },
          data: [
            {
              name: "test", xAxis: 'Feb',
              label: {
                position: 'insideEndTop',
                formatter: '{b}:{c}',
                show: false
              }
            },
            {
              name: "test2", xAxis: 'Mar',
              label: {
                show: false
              }
            }
          ]
        },

      },
      {
        data: [900],
        type: 'line',
        areaStyle: {}
      },
    ]
  }


}
