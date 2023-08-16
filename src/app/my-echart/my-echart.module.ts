import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MyEchartComponent } from './my-echart/my-echart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { OutboundByOriginAreaComponent } from './outbound-by-origin-area/outbound-by-origin-area.component';
import { BarComponent } from '../my-echart/bar/bar.component';
 
import { StackLineComponent } from './stack-line/stack-line.component';
import { OutboundTrendsComponent } from './outbound-trends/outbound-trends.component';
import { TimingComponent } from './timing/timing.component'
import { DateCalendarHeaderComponent } from './timing/date-calendar-header/date-calendar-header.component';
import { DateCalendarComponent } from './timing/date-calendar/date-calendar.component';
import { DeliveryPerformanceComponent } from './delivery-performance/delivery-performance.component';
 
 


@NgModule({
  declarations: [LineChartComponent, MyEchartComponent, OutboundByOriginAreaComponent, BarComponent, 
    StackLineComponent, OutboundTrendsComponent, TimingComponent,
    DateCalendarComponent,
    DateCalendarHeaderComponent,
    DeliveryPerformanceComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

  ],
  providers:[
    DecimalPipe 
  ],
  exports: [
    LineChartComponent, MyEchartComponent
  ]

   
})
export class MyEchartModule { }
