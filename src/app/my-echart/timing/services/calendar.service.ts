import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { CalendarPeriods } from '../models/calendar-periods.model';
import { CalendarHolidays } from '../models/calendar-holidays.model';
import { ApiGateway } from './api.gateway';
import { ApiUrlRepo } from '../models/api.url.repo';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(public _apiGateway: ApiGateway) { }

  getCalendarPeriods(): Observable<CalendarPeriods> {
    return this._apiGateway.get(ApiUrlRepo.CALENDAR_TPORANGES, {
    }).pipe(
      map(
          resp => {
            return CalendarPeriods.toCalendarPeriods(resp);
          }
      )
  )};

  getCalendarHolidays(postalCode: string, date: string): Observable<CalendarHolidays> {
    return this._apiGateway.get(`${ApiUrlRepo.CALENDAR_HOLIDAYS}/${postalCode}?date=${date}`, {
    }).pipe(
      map(
          resp => {
            return CalendarHolidays.toHolidays(resp);
          }
      )
  )};


}
