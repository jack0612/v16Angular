import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AppUtil } from 'src/app/snap-ship/utils/app-util';

//https://www.benmvp.com/blog/nested-string-interpolation-in-javascript/
@Component({
  selector: 'app-outbound-trends',
  templateUrl: './outbound-trends.component.html',
  styleUrls: ['./outbound-trends.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class OutboundTrendsComponent {
  constructor(
    private decimalPipe: DecimalPipe,
  ) {

  }


  private line1RawData = [820, 1132, 1300, 900, 1400, 800, 1100];
  private line2RawData = [920, 1032, 1100, 1900, 900, 700, 1300,];
  private line1Data: any[] = [];
  private line2Data: any[] = [];
  private line1FormattedData: any[] = [];
  private line2FormattedData: any[] = [];
  private description = "8%";
 

  ngOnInit() {
    this.line1RawData.forEach((item, index) => {
      this.line1Data.push(
        {
          value: item,
          itemStyle: {
            color: '#3766BE',
            opacity: (index == this.line1RawData.length - 1) ? 1 : 0,
            borderWidth: 100,
            borderType: 'solid',
            decal: {

            }
          }
        }
      );
      this.line1FormattedData.push(AppUtil.transfromDecimalPipe(this.decimalPipe, item, '1.0-0'));
    }
    );
    this.line2RawData.forEach((item, index) => {
      console.log(index, this.line2RawData.length - 1)
      this.line2Data.push(
        {
          value: item,
          itemStyle: {
            color: '#757575',
            opacity: (index == this.line2RawData.length - 1) ? 1 : 0,
            borderWidth: 3
          }
        },
      );
      this.line2FormattedData.push(AppUtil.transfromDecimalPipe(this.decimalPipe, item, '1.0-0'));
    });
  }

//https://www.benmvp.com/blog/nested-string-interpolation-in-javascript/
  private getDescriptionImageSource(line1Value: number, line2Value: number): string {
    const downRightArrowSvg = '../../../assets/images/i360/down-right-arrow.svg';
    const upRightArrowSvg = '../../../assets/images/i360/up-right-arrow.svg';
    let isDown = line1Value > line2Value;
    const descriptionImageSource = isDown ? downRightArrowSvg : upRightArrowSvg;
    return descriptionImageSource;
  }

  private getDescriptionPercent(line1Value: number, line2Value: number): string {
   
 
    const descriptionPercent = ((
      Math.abs(line1Value-line2Value)*100)/line2Value).toFixed(0)+'%';
    return descriptionPercent;
  }

  options: EChartsOption = {
    aria: {
      enabled: true,
      // label: {
      //   enabled: true,
      //   description: 'this is outbound trends chart'

      // }
    },
    title: {
      text: 'outbound trends',
      show: true
    },
    //https://stackoverflow.com/questions/63748838/customising-tooltip-design-in-echarts-with-react
    tooltip: [
      {
        //position :['right'],
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'click',
        confine: true,
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
        formatter: (params) => {
          console.log('outbound trends:params', this.line1FormattedData, params)
          return `
          <div class="echarts-tooltip">
            <div class="title text">outbound</div>
            <div class="one-row">
              <span class="empty-circle"></span>
              <span class="text">${params[0]['axisValue']}    &nbsp;</span>
              <span class="value"> ${this.line1FormattedData[params[0].dataIndex]}</span>
            </div>
            <div class="one-row">
              <span class="solid-circle"></span>
              <span class="text">${params[1]['axisValue']}  &nbsp;</span>
              <span class="value"> ${this.line2FormattedData[params[1].dataIndex]}</span>
            </div>
            <hr class="i360-margin-bottom-8">
            <div class="one-row ">
              <img width="16" src=${this.getDescriptionImageSource(params[0].data.value, params[1].data.value)}>&nbsp;
              <span class="description-percent">${this.getDescriptionPercent(params[0].data.value, params[1].data.value)} &nbsp;</span>
              <span class="description-text">in selected period<span>
            </div>
          </div>
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
        name: 'first line',
        type: 'line',
        symbol: 'circle',  //the connector
        symbolSize: 10,
        data: this.line1Data,
        markLine: {
          symbol: 'none',
          lineStyle: {
            width: 1,
            type: 'solid',
            color: '#434343'
          },
          data: [
            {
              name: "test", xAxis: 'Jan 09, 2023',
              itemStyle: {
                color: '#3766BE',
              },
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
        name: 'second line',
        type: 'line',
        symbol: 'image://../../../assets/images/i360/circle-outbound-trends-connector.svg',  //https://echarts.apache.org/en/option.html#series-line.symbolSize
        symbolSize: 10,
        data: this.line2Data,
        //https://apache.github.io/echarts-handbook/en/how-to/chart-types/line/basic-line/
        lineStyle: {
          color: '#757575',
          width: 1,
          type: 'dashed'
        },
        itemStyle: {
          color: 'red',
          opacity: 0
        }
      },

    ]
  };
}
