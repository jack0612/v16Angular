import { NativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrderEntryConstants } from '../models/order-entry-constants';
 

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'long'},
      dateA11yLabel: {year: 'numeric', month: 'short', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@Injectable()
export class PickerDateAdapter extends NativeDateAdapter {
  public static INVALID_DATE = "Invalid Date";

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string, @Inject(TranslateService) lang){
    super(lang.currentLang);
  }
  override format(date: Date, displayFormat: Object): string {

      let inputDate: any;
      //set a default value if none exists (workaround the test cases)
      const locale = this.locale || OrderEntryConstants.LANG_EN;
      if (date && date.toString() === PickerDateAdapter.INVALID_DATE){
        inputDate = new Date();
      }else {
        inputDate = date || new Date();
      }

      if (displayFormat === 'input') {
        return formatDate(inputDate,'yyyy-MM-dd',locale);
      } else if (displayFormat === 'summary'){
        //The '.' near the end appears to be added for french abbreviations. Removing the dots.
        return formatDate(inputDate,'yyyy-MMM-dd',locale).toUpperCase().replace(/\./g,'');
      } else {
        //The else applies to the date provided in the calendar header label
        let dateStr = formatDate(inputDate,'MMMM yyyy',locale);
        //In french, by default all the cases are lower (but not in English).
        //As we need same behavior for both English and french, no need to check for language.
        //Upper case the first letter.
        dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
        return dateStr;
      }
  }

  override parse(value: any): Date {

    let inputDate = new Date(value);
    //Normalizing the calendar input field time with the provided offset so the input value and the
    //selected value on the calendar match.
    //This is there to fix the bug where when the date is manually entered into the input field,
    //the date resets to a day before, and also same happens on the calendar flyout.
    inputDate = new Date(inputDate.getTime() + (inputDate.getTimezoneOffset() * 60000 ));
    return inputDate;
  }
}
