import { Component, ViewEncapsulation } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-outbound-trends',
  templateUrl: './outbound-trends.component.html',
  styleUrls: ['./outbound-trends.component.scss'],
  // encapsulation:ViewEncapsulation.ShadowDom
})
export class OutboundTrendsComponent {
  options: EChartsOption = {
    title: {
      text: 'outbound trends'
    },
    //https://stackoverflow.com/questions/63748838/customising-tooltip-design-in-echarts-with-react
    tooltip: [
      {
        //position :['right'],
        trigger: 'axis',
        showDelay: 0,
        axisPointer: {
          type: "line",
          axis: "x",
          crossStyle: {
            type: 'dashed'
          }
        },
        transitionDuration: 0.2,
        formatter: function (params) {
          console.log('line-chart:params', params)
          return `
          <div>${params[0]['axisValue']} : <span class="echarts-tooltip-value"> ${params[0]['data']}</span></div>
        `;
        },
        // textStyle: {
        //   fontSize: 13,
        //   fontFamily: 'Roboto, sans-serif'
        // }
        // ,
      }
    ],
    xAxis: {
      type: 'category',

      boundaryGap: false,
      data: ['Jan 03, 2023', 'Jan 04, 2023', 'Jan 05, 2023', 'Jan 06, 2023', 'Jan 07, 2023', 'Jan 08, 2023', 'Jan 09, 2023'],
      //customize x axis label: https://stackoverflow.com/questions/58796056/changing-xaxis-label-from-echarts-library
      axisLabel: {
        formatter: function (val: string, index: number) {
          return val.substring(0, 6);
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }

    },
    series: [
      {
        name: 'sales',
        type: 'line',
        stack: 'total',
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle:{
          color: '#3766BE',
          opacity:0
        },
        markLine: {
          symbol: 'none',
          lineStyle: {
            width: 1,
            type: 'solid'
          },
          data: [
            {
              name: "test", xAxis: 'Jan 09, 2023',
              label: {
                position: 'insideEndTop',
                formatter: '{b}:{c}',
                show: false
              }
            },
            
          ]
        },

      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310],
        //https://apache.github.io/echarts-handbook/en/how-to/chart-types/line/basic-line/
        lineStyle: {
          color: '#757575',
          width: 1,
          type: 'dashed'
        },
        itemStyle:{
          color:'red',
          opacity:0
        }
      },

    ]
  };
}
