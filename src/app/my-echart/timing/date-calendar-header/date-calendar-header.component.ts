import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { CalendarEventService } from '../date-calendar/date-calendar-event.service';

@Component({
  selector: 'app-date-calendar-header',
  templateUrl: './date-calendar-header.component.html',
  styleUrls: ['./date-calendar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCalendarHeaderComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>, private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats, cdr: ChangeDetectorRef,
    private calendarService: CalendarEventService) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }


  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel);
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
      this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
      this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
      this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
      this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

  closeClicked() {
    this.calendarService.closeCalendar(true);
  }
}
