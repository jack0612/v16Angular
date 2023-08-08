

import { Component } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-graph-simple',
  templateUrl: './graph-simple.component.html',
})
export class GraphSimpleComponent {

  seriesLabel = {
    normal: {
      show: true,
      textBorderColor: '#333',
      textBorderWidth: 2
    }
  }
  data = [
    {
      name: 'Solicitados',
      value: 18203,
    },
    {
      name: 'Aprobados',
      value: 12000,
    },
    {
      name: 'Aceptados',
      value: 13203,
    },
    {
      name: 'Cerrados',
      value: 8203,
    },
    {
      name: 'Negados',
      value: 1203,
    },
    {
      name: 'En revision',
      value: 6203,
    },
    {
      name: 'En mora',
      value: 2203,
    },
  ];
  colors = {
    0: '#00000',
    1: '#eeeee',
    2: '#ccc',
    3: '#bcbcbc',
    4: '#eeffee',
    5: '#ff0000',
    6: '#fff000',
  };
  options: EChartsOption = {
    title: {
      text: 'World Population',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: this.data.map((item) => item.name).reverse(),
    },
    series: [
      {
        type: 'bar',
        data: this.data.map((item) => item.value).reverse(),
        // itemStyle: {
        //   color: function (param) {
        //     console.log(param);
        //     return this.colors[param.dataIndex];
        //   },
        // },
        label: {
          position: 'top'
        },
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