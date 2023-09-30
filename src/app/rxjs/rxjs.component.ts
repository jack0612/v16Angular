import { Component, Inject, OnInit } from '@angular/core';
import { DataService, DataService2, FakeDataService, FakeDataService2 } from '../app.module';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor(
    @Inject(DataService) private fakeDataService:      FakeDataService,
    @Inject(DataService2) private fakeDataService2:      FakeDataService2,
  ) { }

  ngOnInit(): void {
  }

}
