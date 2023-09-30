import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-elements',
  templateUrl: './angular-elements.component.html',
  styleUrls: ['./angular-elements.component.scss']
})
export class AngularElementsComponent implements OnInit {
  title = "AngularElementsComponent"
  constructor() { }

  ngOnInit(): void {
  }

}
