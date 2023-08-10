import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { merge, of, throwError } from 'rxjs';
import { CalendarService } from "../services/calendar.service";
import { getCalendarHolidays, getCalendarHolidaysFailure, getCalendarHolidaysSuccess, getCalendarPeriods, getCalendarPeriodsFailure, getCalendarPeriodsSuccess } from "./calendar.actions";



@Injectable()
export class CalendarEffects {

    constructor(private _actions$: Actions,
        private _calService: CalendarService) {
    }

  getCalendarDetails$ = createEffect(() =>
    this._actions$.pipe(
        ofType( getCalendarPeriods),
        switchMap(() => {
            return this._calService.getCalendarPeriods().pipe(
                map((calendarPeriods) => {
                    // let periods = JSON.parse(JSON.stringify(calendarPeriods), DateUtils.DateTimeReviverToString)
                    return getCalendarPeriodsSuccess({calendarPeriods})
                }

                ),
                catchError((error) =>
                merge(
                    of(
                         getCalendarPeriodsFailure({
                            error: JSON.parse(JSON.stringify('Calendar Periods:',error)),
                        })
                    ),
                    throwError( () => Error(error))
                )
              )
            );
        }

      )
    )
  );

  getCalendarHolidays$ = createEffect(() =>
  this._actions$.pipe(
      ofType( getCalendarHolidays),
      switchMap((params) => {
          return this._calService.getCalendarHolidays(params.postalCode, params.date).pipe(
              map((calendarHolidays) => {
                  return  getCalendarHolidaysSuccess({calendarHolidays})
              }

              ),
              catchError((error) =>
              {
                return merge(
                  of(
                     getCalendarHolidaysFailure({
                          error: JSON.parse(JSON.stringify('Calendar holidays:',error)),
                      })
                  ),
                  throwError( () => Error(error))
              )
              }


            )
          );
      }
    )
  )
);

}
