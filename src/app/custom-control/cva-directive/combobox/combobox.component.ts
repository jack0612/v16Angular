import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';


import { filter, takeUntil } from 'rxjs';

import { CvaDirective, Nullable } from '../cva.directive';
import { DestroyedService } from '../destroyed.service';

export interface ComboboxItem {
  label: string;
  value: string;
}

export type AcceptableComboboxItem = ComboboxItem | string;
let UNIQUE_ID = 0;

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [
    DestroyedService,

  ],
  hostDirectives: [
    {
      directive: CvaDirective,
    }
  ],
})
export class ComboboxComponent  {
  readonly _cvaDirective =
    inject<CvaDirective<string>>(CvaDirective);

  private readonly _destroyed$ = inject(DestroyedService);
  @ViewChild('comboboxInput')
  comboboxInput?: ElementRef<HTMLInputElement>;
  readonly uniqueId = ++UNIQUE_ID;

  @HostBinding('class.is-invalid')
  controlInvalid = false;

  get value(): Nullable<string> {
    return this._cvaDirective.value;
  }

  @Input()
  placeholder: Nullable<string> = null;

  @Input()
  options: string[] = [];



  /** Method called when user types into the input field. */
  onInput(event: Event) {
    this._cvaDirective.setValue(
      (<HTMLInputElement>event.target).value ?? '',
      true
    );
  }

  /** Method called when user focuses-out the input field. */
  onBlur() {
    this._cvaDirective.onTouched();
  }

}

