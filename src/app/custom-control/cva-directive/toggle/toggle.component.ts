import { Component, inject, Input } from '@angular/core';
import { CvaDirective, Nullable } from '../cva.directive';


let UNIQUE_ID = 0;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  hostDirectives: [
    {
      directive: CvaDirective,
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ['disabled'],
    },
  ],
})
export class ToggleComponent {
  readonly uniqueId = ++UNIQUE_ID;
  readonly cvaDirective = inject(CvaDirective);

  @Input()
  label: Nullable<string>;

  onInput(event: boolean) {
    this.cvaDirective.setValue(event, true);
  }

  onBlur() {
    this.cvaDirective.onTouched();
  }
}

