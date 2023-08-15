import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AppUtil } from 'src/app/snap-ship/utils/app-util';
import { AppIconRepo } from '../timing/models/app-icon-repo';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-outbound-trends',
  templateUrl: './outbound-trends.component.html',
  styleUrls: ['./outbound-trends.component.scss'],
  //encapsulation:ViewEncapsulation.ShadowDom
})
export class OutboundTrendsComponent {
  constructor(
    private decimalPipe: DecimalPipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { 
      this.matIconRegistry.addSvgIcon(
        'date_calendar_icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl(AppIconRepo.CALENDAR_DEFAULT)
      );
      this.matIconRegistry.addSvgIcon(
        this.downRightArrowIcon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.downRightArrowIconSrc)
      );
    }


  private line1RawData = [820, 1132, 1300, 900, 1400, 800, 1100, 1000, 600, 800, 1000, 1200];
  private line2RawData = [920, 1032, 1100, 1900, 900, 700, 1300, 1100, 1600, 1800, 1200, 1300];
  private line1Data: any[] = [];
  private line2Data: any[] = [];
  private line1FormattedData: any[] = [];
  private line2FormattedData: any[] = [];
  private description = "8%";
  downRightArrowIconSrc = AppIconRepo.DWON_RIGHT_ARROW_ICON;
  downRightArrowIcon="down-right-arrow";
  toggleIcon: string = 'date_calendar_icon';

  ngOnInit() {

    this.line1RawData.forEach(item => {
      this.line1Data.push(
        {
          value: item,
          itemStyle: {
            color: '#3766BE',
            opacity: 0
          }
        }
      );
      this.line1FormattedData.push(AppUtil.transfromDecimalPipe(this.decimalPipe, item, '1.0-0'));
    }
    );
    this.line2RawData.forEach(item => {
      this.line2Data.push(
        {
          value: item,
          itemStyle: {
            color: '#3766BE',
            opacity: 0
          }
        },
      );
      this.line2FormattedData.push(AppUtil.transfromDecimalPipe(this.decimalPipe, item, '1.0-0'));
    });
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
            <div class="one-row">
              <mat-icon svgIcon="{{toggleIcon}}"></mat-icon>
              <span class="description-percent">${this.description} &nbsp;</span>
              <span class="description-text">in selected period.<span>
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
        name: 'sales',
        type: 'line',
        stack: 'total',
        data: this.line1Data,
        markLine: {
          symbol: 'none',
          lineStyle: {
            width: 1,
            type: 'solid'
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
        stack: 'total',
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
