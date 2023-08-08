

import { Component } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-graph-simple',
  templateUrl: './outbound-by-origin-area.component.html',
})
export class OutboundByOriginAreaComponent {

  seriesLabel = {
    normal: {
      show: true,
      textBorderColor: '#333',
      textBorderWidth: 2
    }
  }
  data = [
    {
      name: 'Ontario',
      value: 2672,
      itemStyle: {color: 'blue'},
    },
    {
      name: 'Quebec',
      value: 1266,
      itemStyle: {color: 'blue'},
    },
    {
      name: 'British Columbia',
      itemStyle: {color: 'blue'},
      value: 700,
    },
    {
      name: 'Albert',
      value: 489,
      itemStyle: {color: 'grey'},
    },
    {
      name: 'Monitoba',
      value: 489,
      itemStyle: {color: 'grey'},
    },
    {
      name: 'Novia Scotia',
      value: 400,
      itemStyle: {color: 'grey'},
    },
    {
      name: 'En mora',
      value: 300,
      itemStyle: {color: 'grey'},
    },
    {
      name: 'En mora',
      value: 200,
      itemStyle: {color: 'grey'},
    },
    {
      name: 'En mora',
      value: 100,
      itemStyle: {color: 'grey'},
    },
    {
      name: 'En mora',
      value: 50,
      itemStyle: {color: 'grey'},
    },
  ].reverse();

  options: EChartsOption = {
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'shadow',
    //   },
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      //https://stackoverflow.com/questions/73439675/echarts-hide-xaxis-and-ticks
      splitLine:{ show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'category',
      splitLine:{ show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true },
      data: this.data.map((item) => item.name),
    },
    series: [
      {
        cursor:"default",
        type: 'bar',
        label: {
          show: true,
          position: 'right'
        },
        data: this.data
        // markPoint: {
        //   symbolSize: 1,
        //   symbolOffset: [0, '50%'],
        // label: {
        //    normal: {
        //         formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
        //         backgroundColor: 'rgb(242,242,242)',
        //         borderColor: '#aaa',
        //         borderWidth: 1,
        //         borderRadius: 4,
        //         padding: [4, 10],
        //         lineHeight: 26,
        //         // shadowBlur: 5,
        //         // shadowColor: '#000',
        //         // shadowOffsetX: 0,
        //         // shadowOffsetY: 1,
        //         position: 'right',
        //         distance: 20,
        //         rich: {
        //             a: {
        //                 align: 'center',
        //                 color: '#fff',
        //                 fontSize: 18,
        //                 textShadowBlur: 2,
        //                 textShadowColor: '#000',
        //                 textShadowOffsetX: 0,
        //                 textShadowOffsetY: 1,
        //                 textBorderColor: '#333',
        //                 textBorderWidth: 2
        //             },
        //             b: {
        //                  color: '#333'
        //             },
        //             c: {
        //                 color: '#ff8811',
        //                 textBorderColor: '#000',
        //                 textBorderWidth: 1,
        //                 fontSize: 22
        //             }
        //         }
        //    }
        // },
        // data: [
        //     {type: 'max', name: 'max days: '},
        //     {type: 'min', name: 'min days: '}
        // ]
        // }
      },
    ],
  };
}