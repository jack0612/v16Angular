import { Action, createReducer, on } from "@ngrx/store";
import { CalendarHolidays } from "../models/calendar-holidays.model";
import { LoadingState, ResultState } from "src/app/snap-ship/common/models/api.state";
import { getCalendarHolidays, getCalendarHolidaysFailure, getCalendarHolidaysSuccess, getCalendarPeriods, getCalendarPeriodsFailure, getCalendarPeriodsSuccess } from "./calendar.actions";
import { deepCopy } from "src/app/snap-ship/ship-common/utils/deep-copy.util";
import { CalendarPeriods } from "../models/calendar-periods.model";
 



//Holiday setup for Calendar Holidays
export interface CalendarHolidayState {
    postalCode: string,
    date: string,
    calendarHolidays: CalendarHolidays,
    calendarHolidayLoadResultState: ResultState;
}

export const initialStateHoliday: CalendarHolidayState = {
    postalCode: '',
    date: '',
    calendarHolidays: null,
    calendarHolidayLoadResultState: LoadingState.INIT,
}

const _holidayReducer = createReducer(
    initialStateHoliday,
    on( getCalendarHolidays, (state, {postalCode, date}) => ({
      ...state,
      calendarHolidayLoadResultState: LoadingState.LOADING,
    })),
    on( getCalendarHolidaysSuccess, (state, { calendarHolidays }) => {
      const newState: CalendarHolidayState = { ...state } as CalendarHolidayState;
      newState.calendarHolidays = deepCopy(calendarHolidays);
      newState.calendarHolidayLoadResultState = LoadingState.LOADED;
      return newState;
    }),
    on( getCalendarHolidaysFailure, (state, { error }) => {
      const newState = { ...state };
      let apiErrorState: any = { error };
      newState.calendarHolidayLoadResultState = apiErrorState;
      return newState;
    })
  );

export function CalendarHolidaysReducers(
    state: CalendarHolidayState = initialStateHoliday,
    action: Action
){
    return _holidayReducer(state, action);
}


//Reducer setup for Calendar Periods.
export interface CalendarPeriodState {
    calendarPeriods: CalendarPeriods;
    calendarPeriodsLoadResultState: ResultState;
}

export const initialStatePeriod: CalendarPeriodState = {

    calendarPeriods: null,
    calendarPeriodsLoadResultState: LoadingState.INIT,
}

const _periodReducer = createReducer(
    initialStatePeriod,
    on( getCalendarPeriods, (state) => ({
      ...state,
      calendarPeriodsLoadResultState: LoadingState.LOADING,
    })),
    on( getCalendarPeriodsSuccess, (state, { calendarPeriods }) => {
      const newState: CalendarPeriodState = { ...state } as CalendarPeriodState;
      newState.calendarPeriods = deepCopy(calendarPeriods);
      newState.calendarPeriodsLoadResultState = LoadingState.LOADED;
      return newState;
    }),
    on( getCalendarPeriodsFailure, (state, { error }) => {
      const newState = { ...state };
      let apiErrorState: any = { error };
      newState.calendarPeriodsLoadResultState = apiErrorState;
      return newState;
    })
  );

export function CalendarPeriodReducers(
    state: CalendarPeriodState = initialStatePeriod,
    action: Action
){
    return _periodReducer(state, action);
}
