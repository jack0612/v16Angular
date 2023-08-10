import { createAction, props } from '@ngrx/store';
import { CalendarPeriods } from '../models/calendar-periods.model';
import { CalendarHolidays } from '../models/calendar-holidays.model';


//Calendar Periods
export const getCalendarPeriods = createAction('[CalendarPeriods] getCalendarPeriods') ;
export const getCalendarPeriodsSuccess = createAction(
    '[CalendarPeriods] getCalendarPeriods Success',
    props<{ calendarPeriods: CalendarPeriods }> ()
)
  
export const getCalendarPeriodsFailure = createAction(
    '[CalendarPeriods] getCalendarPeriods Failure',
    props<{ error: any }>()
);

//Calendar Holidays 
export const getCalendarHolidays = createAction(
    '[CalendarHolidays] getCalendarHolidays',
    props<{postalCode: string, date: string}>()
);

export const getCalendarHolidaysSuccess = createAction(
    '[CalendarHolidays] getCalendarHolidays Success',
    props<{ calendarHolidays: CalendarHolidays }>()
);
  
export const getCalendarHolidaysFailure = createAction(
    '[CalendarHolidays] getCalendarHolidays Failure',
    props<{ error: any }>()
);