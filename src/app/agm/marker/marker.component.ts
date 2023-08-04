 

import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IMapMarker } from '../model/map-marker.interface';

//https://softtechdiary.com/angular-google-maps-agm-complete-guide-tutorial/
// just an interface for type safety.

declare var google: any;
@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent  {
   
}
