import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MyEchartComponent } from './my-echart/my-echart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphSimpleComponent } from './graph-simple/graph-simple.component';
import { BarComponent } from '../my-echart/bar/bar.component';
 
import { StackLineComponent } from './stack-line/stack-line.component';
import { OutboundTrendsComponent } from './outbound-trends/outbound-trends.component'


@NgModule({
  declarations: [LineChartComponent, MyEchartComponent, GraphSimpleComponent, BarComponent, StackLineComponent, OutboundTrendsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    LineChartComponent, MyEchartComponent
  ]

   
})
export class MyEchartModule { }
