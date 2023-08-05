import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalShoppingCart } from './signal-shopping-cart/signal-shopping-cart.component';
import { SignalComponent } from './signal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SignalShoppingCart,
    SignalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [SignalComponent]
})
export class SignalModule { }
