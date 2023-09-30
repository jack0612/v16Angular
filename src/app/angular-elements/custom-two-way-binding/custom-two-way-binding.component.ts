import { Component, EventEmitter, Input, Output } from '@angular/core';
//
@Component({
  selector: 'app-custom-two-way-binding',
  templateUrl: './custom-two-way-binding.component.html',
  styleUrls: ['./custom-two-way-binding.component.scss']
})
export class CustomTwoWayBindingComponent {
  messageValue: string;

  @Output()
  messageChange = new EventEmitter<string>();

  @Input()
  get message() {
    return this.messageValue;
  }

  set message(val) {
    this.messageValue = val;
    this.messageChange.emit(this.messageValue);
  }
}
