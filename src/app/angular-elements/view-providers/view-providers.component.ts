import { Component, Injectable } from '@angular/core';
//https://codecraft.tv/courses/angular/dependency-injection-and-providers/ngmodule-providers-vs-component-providers-vs-component-viewproviders/
@Component({
  selector: 'app-view-providers',
  templateUrl: './view-providers.component.html',
  styleUrls: ['./view-providers.component.scss']
})
export class ViewProvidersComponent {

}

@Injectable()
export class SimpleService {
  value: string;
}

@Component({
  selector: "child",
  template: `
 <div class="child">
   <p>Child</p>
   {{ service.value }}
</div>
 `,
  styles: [
    `
      .child {
        background-color: #239cde;
        padding: 10px;
      }
    `
  ]
})
export class ChildComponent {
  constructor(public service: SimpleService) {}
}

@Component({
  selector: "parent",
  template: `
 <div class="parent">
   <p>Parent</p>
   <form novalidate>
  			<div class="form-group">
  			<input type="text"
  			       class="form-control"
  			       name="value"
  			       [(ngModel)]="service.value">
  		</div>
  </form>
  <ng-content></ng-content>
</div>
 `,
  styles: [
    `
      .parent {
        background-color: #d1e751;
        padding: 10px;
      }
    `
  ],
  viewProviders: [SimpleService]
})
export class ParentComponent {
  constructor(public service: SimpleService) {}
}
