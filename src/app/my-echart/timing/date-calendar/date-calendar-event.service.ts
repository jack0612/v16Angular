import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CalendarEventService {

  private _closeCalendarSource = new BehaviorSubject<boolean>(false);
  isCloseCalendar = this._closeCalendarSource.asObservable();

  closeCalendar(message: boolean) {
    this._closeCalendarSource.next(message);
  }

}