import { createSelector } from "@ngrx/store";
import { LoadingState } from "src/app/snap-ship/common/models/api.state";
import { AppState } from "./app.state";

const orderEntryState = (state: AppState) => state && state.orderEntry;
const calendarPeriodState = (state: AppState) => state.calendarPeriod;
const calendarHolidayState = (state: AppState) => state.calendarHolidays;

export const hasCampaignParametersLoaded = createSelector(
    orderEntryState,
    (state) => state && state.campaignParametersLoadResultstate === LoadingState.LOADED
);

export const selectCampaignParameters = createSelector(
    orderEntryState,
    (state) => state && state.campaignParameters
);

export const selectCalendarPeriods = createSelector(
    calendarPeriodState,
    (state) => state && state.calendarPeriods
);

export const selectCustomerDetails = createSelector(
    orderEntryState,
    (state) => state && state.customerDetails
);

export const selectCalendarHolidays = createSelector(
    calendarHolidayState,
    (state) => state && state.calendarHolidays
);

 
