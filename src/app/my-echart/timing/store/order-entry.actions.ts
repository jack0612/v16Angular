import { createAction, props } from '@ngrx/store';
import { CampaignParameters } from '../models/campaign-parameters.model';
 


 
export const getCampaignParameters = createAction('[AccordionsCards] getCampaignParameters',
  props<{ mailingId: string, customerId: string }>()
);

export const getCampaignParametersSuccess = createAction(
  '[AccordionsCards] getCampaignParametersSuccess',
  props<{ campaignParameters: CampaignParameters }>()
);

export const getCampaignParametersFailure = createAction(
  '[AccordionsCards] getCampaignParametersFailure',
  props<{ error: any }>()
);

 



