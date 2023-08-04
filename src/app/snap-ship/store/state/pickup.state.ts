 
import { ResultState, LoadingState } from "../../common/models/api.state";
import { BookedPickupsDto } from "../../ship-common/models/pickup/booked-pickups-dto.model";
import { ENTRY_BOOKEDPICKUPS_OF_PICKUP, ENTRY_BOOEDPICKUPSRESULTSTATE_OF_PICKUP } from "../store-entry-name";

export interface PickupState {
    bookedPickups: BookedPickupsDto;
    [ENTRY_BOOEDPICKUPSRESULTSTATE_OF_PICKUP]: ResultState;
}

export const initialPickupState: PickupState = {
    bookedPickups: {},
    [ENTRY_BOOEDPICKUPSRESULTSTATE_OF_PICKUP]: LoadingState.INIT
}