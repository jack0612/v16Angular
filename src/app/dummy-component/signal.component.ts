import { Component, OnInit } from '@angular/core';
/*
//https://itnext.io/angular-signals-the-future-of-angular-395a69e60062
// Signature of signal function
export function signal<T>(initialValue: T, options?: CreateSignalOptions<T>): WritableSignal<T>

//Signature of CreateSignalOptions
export interface CreateSignalOptions<T> {
 
  equal?: ValueEqualityFn<T>;
}

//How use it
const movies = signal<Movie[]>([]);
*/
@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
