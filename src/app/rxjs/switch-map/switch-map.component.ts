import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
//https://www.tektutorialshub.com/angular/using-switchmap-in-angular/
@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.activatedRoute.paramMap
    .pipe(
      switchMap((params: Params) => {
        return this.service.getProduct(params.get('id'))
      }
      ))
    .subscribe((product: Product) => this.product = product);
    */

    /*
this.mainForm.get("productCode").valueChanges
.pipe(
  debounceTime(700),
  switchMap(val => {
    return this.queryDepositData();
  })
)
.subscribe(data => {
  this.product=data;
})
    */

    const outer$ = of(1, 2, 3,4,5);


  console.log('sm ngOnInit')
    outer$.pipe(
      switchMap(value => {
        // This is the inner observable that can emit multiple values.
        return interval(1000).pipe(take(3));
      })
    )
      .subscribe(value => {
        console.log(' sm:' + value); // Will emit values 0, 1, 2, 0, 1, 2, 0, 1, 2
      });
  }

}
