import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface Hero {
  id:number;
  name:string;
}
@Component({
  selector: 'dashboard-hero',
  template: `
    <div (click)="click()" class="hero">
      {{hero?.name | uppercase}}
    </div>`,
  styleUrls: [ './dashboard-hero.component.css' ]
})
export class DashboardHeroComponent implements OnInit {
  @Input() hero: Hero|null=null;
  @Output() selected :EventEmitter<Hero>= new EventEmitter<Hero>();
  click() { this.selected.emit( this.hero || undefined); }
  constructor() { }

  ngOnInit(): void {
  }

}
