import { NgModule } from '@angular/core';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
 

 

 

@NgModule({
  declarations: [ ],
  imports: [
    FlightBookingComponent,
    FlightSearchComponent,
    PassengerSearchComponent,
    FlightEditComponent


  ],
  exports: [
    FlightBookingComponent,
  ]
})
export class NgrxV16Module { }
