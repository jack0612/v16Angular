import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoggerService } from "../shared/service/logger.service";
 

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  providers:[LoggerService],
  selector: 'app-flight-booking',

  templateUrl: './flight-booking.component.html'
})
export class FlightBookingComponent {
  //logger = inject(LoggerService);

  //constructor(logger:LoggerService) {
  //   this.logger.info('booking', 'Hello from Booking');
//}

}
