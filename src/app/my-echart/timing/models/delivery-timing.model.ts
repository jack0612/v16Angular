export class DeliveryTiming {
    deliveryStartType: CampaignStart;
    dateSelected: Date;
    dropOffBetweenStart: Date;
    dropOffBetweenEnd: Date;

    constructor() {
        this.dateSelected = new Date(); // set a default value
        this.dropOffBetweenEnd = new Date()
        this.dropOffBetweenStart = new Date(); 
        this.deliveryStartType = CampaignStart.AFTER_DROP_OFF;
    }
}

export enum CampaignStart {
    AFTER_DROP_OFF = 1, 
    SPECIFIC_DATE = 2
}
  