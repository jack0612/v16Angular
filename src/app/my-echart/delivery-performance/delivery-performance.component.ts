import { Component, ViewEncapsulation } from '@angular/core';
import { DeliveryPerformance } from './delivery-performance.model';

@Component({
  selector: 'app-delivery-performance',
  templateUrl: './delivery-performance.component.html',
  styleUrls: ['./delivery-performance.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DeliveryPerformanceComponent {

   deliveryPerformances: DeliveryPerformance[] = DeliveryPerformance.getDeliveryPerformance();

}
