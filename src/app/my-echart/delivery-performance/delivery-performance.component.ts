import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeliveryPerformance } from './delivery-performance.model';

@Component({
  selector: 'app-delivery-performance',
  templateUrl: './delivery-performance.component.html',
  styleUrls: ['./delivery-performance.component.scss'],
  //encapsulation: ViewEncapsulation.ShadowDom //shadowDom makes document.querySelector not work
})
export class DeliveryPerformanceComponent implements AfterViewInit {

  deliveryPerformances: DeliveryPerformance[] = DeliveryPerformance.getDeliveryPerformance();
  ngAfterViewInit() {
    const dpBar = document.querySelector('.dilivery-performance');
    if (dpBar) {
      this.setBarWidth(dpBar.getBoundingClientRect().width);
    }
  }

  private setBarWidth(windowWidth: number) {
      const barBodys = document.querySelectorAll('.bar-body');
      (barBodys || []).forEach((barBody: HTMLElement,index) => {
        const dp=this.deliveryPerformances[index];
        let barBodyWidth = (dp.percent / 100) * windowWidth - 16;
        if (barBodyWidth < 1) {
          barBodyWidth = 1;
        }
        barBody.setAttribute('style', `width:${barBodyWidth}px`);
      });
    
  }
}
