import { ActionReducerMap } from "@ngrx/store";
import { CalendarHolidayState, CalendarHolidaysReducers, CalendarPeriodReducers, CalendarPeriodState } from "./calendar.reducers";
import { OrderEntryState, OrderEntryReducers } from "./order-entry.reducers";

export interface AppState {
    orderEntry: OrderEntryState,
    calendarPeriod:  CalendarPeriodState,
    calendarHolidays:  CalendarHolidayState
}

export const initialState: AppState = {
    orderEntry: null,
    calendarPeriod: null,
    calendarHolidays:null
};

export const reducers: ActionReducerMap<AppState> = {
    orderEntry:  OrderEntryReducers,
    calendarPeriod: CalendarPeriodReducers,
    calendarHolidays:  CalendarHolidaysReducers
}