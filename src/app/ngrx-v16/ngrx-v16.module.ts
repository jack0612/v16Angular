import { NgModule } from '@angular/core';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgrxV16Component } from './ngrx-v16.component';
 

 

 

@NgModule({
  declarations: [
    FlightBookingComponent,
    NgrxV16Component
   ],
  imports: [

    // FlightSearchComponent,
    // PassengerSearchComponent,
    // FlightEditComponent
    CommonModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    NgrxV16Component
  ]
})
export class NgrxV16Module { }
