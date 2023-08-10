import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FlightBookingComponent
  ],
  selector: 'app-ngrx-v16',
  templateUrl: './ngrx-v16.component.html',
  styleUrls: ['./ngrx-v16.component.scss']
})
export class NgrxV16Component {

}
