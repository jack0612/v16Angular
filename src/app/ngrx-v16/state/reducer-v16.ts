import { MemoizedSelector, createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Flight } from "../model/flight";
 
import { ticketingActions } from "./action-v16";
import { addMinutes } from "../shared/utility-common/date-util";

export interface BookingState {
    flights: Flight[];
    criteria: {
        from: string;
        to: string;
    },
    basket: Record<number, boolean>
}

export const initialState: BookingState = {
    flights: [],
    criteria: {
        from: 'Graz',
        to: 'Hamburg'
    },
    basket: {
    }
}

function updateDate(flight: Flight): Flight {
    return {...flight, date: addMinutes(flight.date, 15) }
}

const     reducer= createReducer(
    initialState,
    on(ticketingActions.flightsLoaded, (state, action) => {
        return { ...state, flights: action.flights };
    }),
    on(ticketingActions.delayFlight, (state, action) => {
        const flights = state.flights.map(f => f.id !== action.id ? f : updateDate(f) )
        return { ...state, flights };
    }),
    on(ticketingActions.updateCriteria, (state, action) => {
        return {
            ...state,
            criteria: {
                from: action.from,
                to: action.to
            }
        }
    }),
    on(ticketingActions.updateBasket, (state, action) => {
        return {
            ...state,
            basket: { 
                ...state.basket, 
                [action.id]: action.selected
            }
        }
    })
);

export const ticketingFeature = createFeature({
    name: 'booking',
    reducer,
    extraSelectors:({selectFlights,selectBasket})=>({
        selectAbc: createSelector(
            selectFlights,
            selectBasket,
            (flights,basker)=> flights[0]
        )
    })
});
 
