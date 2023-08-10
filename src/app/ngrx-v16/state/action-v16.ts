import { createActionGroup, props } from "@ngrx/store";
import { Flight } from "../model/flight";

export const ticketingActions = createActionGroup({
    source: 'booking',
    events: {
        'load flights': props<{from: string, to: string}>(),
        'delay flight': props<{id: number}>(),
        'update criteria': props<{from: string, to: string}>(),
        'update basket': props<{id: number, selected: boolean}>(),
        'flights loaded': props<{flights: Flight[]}>()
    }
});
