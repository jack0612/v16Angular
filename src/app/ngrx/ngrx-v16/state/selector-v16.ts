import { createSelector } from "@ngrx/store";
import { BookingState, ticketingFeature } from "./reducer-v16";

export const selectBasket = createSelector(
    ticketingFeature.selectBookingState,
    (state: BookingState) => state.basket,
)