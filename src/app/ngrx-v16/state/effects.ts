import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { FlightService } from "../../shared/service/flight.service";
import { ticketingActions } from "./action-v16";

@Injectable({
    providedIn: 'root'
})
export class BookingEffects {

    loadFlights$ = createEffect(() => this.actions$.pipe(
        ofType(ticketingActions.loadFlights),
        switchMap(a => this.flightService.find(a.from, a.to)),
        map(flights => ticketingActions.flightsLoaded({flights}))
    ));

    constructor(private actions$: Actions, 
        private flightService: FlightService) { }
}
