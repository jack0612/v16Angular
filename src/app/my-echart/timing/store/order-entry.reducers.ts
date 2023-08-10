import { Action, createReducer, on } from "@ngrx/store";
import { CampaignParameters } from "../models/campaign-parameters.model";
import { LoadingState, ResultState } from "src/app/snap-ship/common/models/api.state";
 
import { getCampaignParameters, getCampaignParametersSuccess, getCampaignParametersFailure } from "./order-entry.actions";
import { CustomerDetails } from "../models/customer-details.model";
 
 
 
 


export const default_mailing_id = '';

export interface OrderEntryState {
  customerDetails: CustomerDetails;
  campaignParameters: CampaignParameters;
  campaignParametersLoadResultstate: ResultState;
   
};

export const initialState: OrderEntryState = {
  customerDetails:null,
 
  campaignParameters: null,
  campaignParametersLoadResultstate: LoadingState.INIT,
   
};


const _reducer = createReducer(
  initialState,
   
 
 

  // --------------------- campaign parameters ------------------------------
  //11
  on( getCampaignParameters, (state) => ({
    ...state,
    campaignParametersLoadResultstate: LoadingState.LOADING,
  })),
  //12
  on( getCampaignParametersSuccess, (state, { campaignParameters }) => {
    const newState: OrderEntryState = { ...state } as OrderEntryState;
    newState.campaignParameters = campaignParameters;
    
    newState.campaignParametersLoadResultstate = LoadingState.LOADED;
    return newState;
  }),
  //13
  on( getCampaignParametersFailure, (state, { error }) => {
    const newState = { ...state };
    let apiErrorState: any = { error };
    newState.campaignParametersLoadResultstate = apiErrorState;
    return newState;
  }),
  
   


);

export function OrderEntryReducers(
  state: OrderEntryState = initialState,
  action: Action
) {
  return _reducer(state, action);
}
