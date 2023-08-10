import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, } from 'rxjs';
import { CampaignParameters } from './models/campaign-parameters.model';
import { CampaignStart, DeliveryTiming } from './models/delivery-timing.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { deepCopy } from 'src/app/snap-ship/ship-common/utils/deep-copy.util';

import { PeriodRange } from './models/calendar-periods.model';
import { PickerDateAdapter } from './services/date-calendar-picker-format';
import { AppIconRepo } from './models/app-icon-repo';

import { OrderEntryUtils } from './utils/order-entry-utils';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.scss']
})
export class TimingComponent {



  currentCard$: Observable<number>;
  currentCard: number;
  msgContent: string;
  oneErrorState: boolean = false;
  numberOfErrors = 0;
  isDisplayGoto: boolean = true;
  isDisplayErrorNotification: boolean = true;
  deliveryTimingFormGroup: FormGroup;
  campaignParameters: CampaignParameters;
  campaignStartType: typeof CampaignStart = CampaignStart;
  campaignStartSelection: CampaignStart;
  deliveryStartType = new FormControl(CampaignStart.AFTER_DROP_OFF, [Validators.required]);
  dateSelected = new FormControl(null, [Validators.required]);
  deliveryTiming: DeliveryTiming = new DeliveryTiming();
  periodRange: PeriodRange;
  periodStart: Date;
  periodEnd: Date;
  private subsHoldingFee: Subscription = null;

  constructor(public translate: TranslateService,
    private _fb: FormBuilder,
    //public browserCacheService: BrowserCache,
    public dateAdapter: PickerDateAdapter,
    public store: Store<AppState>,
  ) {

    this.deliveryTimingFormGroup = this._fb.group({
      deliveryStartType: this.deliveryStartType,
      dateSelected: this.dateSelected
    })

  }
  iconRepo = AppIconRepo;

  ngOnInit(): void {

    this.currentCard$ = OrderEntryUtils.currentCard$;
    this.currentCard$.subscribe(currentCard => {
      this.currentCard = currentCard;
    });
    //this.loadCampaignParameters();
  }

  /* Save valid record on click Confirm */
  public validateFormAndSave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.displayErrorNotification();
    //if there's errors
    if (this.dateSelected.hasError('invalidValue')
      || this.dateSelected.hasError('required')) {
      this.dateSelected.setErrors({ invalidValue: true })
      this.oneErrorState = true;
    } else if (this.dateSelected.value === null) {
      this.dateSelected.setErrors({ invalidValue: true });
      this.oneErrorState = true;
    } else {
      this.oneErrorState = false;

      const tempStart = new Date(this.deliveryTiming.dropOffBetweenStart);
      const tempEnd = new Date(this.deliveryTiming.dropOffBetweenEnd);
      this.deliveryTiming = Object.assign({}, this.deliveryTimingFormGroup.value);
      this.deliveryTiming.dropOffBetweenStart = tempStart;
      this.deliveryTiming.dropOffBetweenEnd = tempEnd;

      //save the campaign parameters
      if (this.campaignParameters && this.campaignParameters.timing) {
        const campaignParameters: CampaignParameters = deepCopy(this.campaignParameters);
        campaignParameters.timing.mailingDate = JSON.parse(JSON.stringify(this.deliveryTiming.dateSelected));
        campaignParameters.timing.specificStartDate = this.deliveryTiming.deliveryStartType == CampaignStart.SPECIFIC_DATE;
        // this.store.dispatch(saveCampaignParameters({campaignParameters}));
        // this.store.dispatch(getOrderSummary());
        // this.store.dispatch(saveOrderEntryInDatabase());
        //reload the holding fees values
        this.loadHoldingFee();
      }
      // this.browserCacheService.updateDeliveryTimingInCache(this.deliveryTiming);
      // OrderEntryUtils.isDeliveryTimingComplete$.next(true);

      // When current card is validated - set the currentCard to 0
      OrderEntryUtils.currentCard$.next(0);
    }
  }

  public displayErrorNotification(): void {

    this.isDisplayGoto = false;
    this.translate.get('EASYFLOW.ORDER_ENTRY.PANELS.TIMING.ERROR_MSG.SELECT_VALID',
      { numOfErrors: this.numberOfErrors }).subscribe(value => { this.msgContent = value; });
    this.isDisplayErrorNotification = true;
  }

  public setValidDate(event): void {
    this.dateSelected.setValue(event.value);

    if (this.dateSelected.value === null && !event.reset) {
      this.dateSelected.setErrors({ invalidValue: true })
    } else {
      this.dateSelected.setErrors(null);
      this.oneErrorState = false; //also reset the card error state.
    }
  }

  public setPeriod(periodRange): void {

    this.periodStart = periodRange.effectiveDate;
    this.periodEnd = periodRange.expiryDate;
  }

  public setDropOffBetween(dropOffBetween): void {
    this.deliveryTiming.dropOffBetweenStart = new Date(dropOffBetween.dropOffStart);
    this.deliveryTiming.dropOffBetweenEnd = new Date(dropOffBetween.dropOffEnd);
  }

  public campaignStartOptionHandler(event): void {

    this.deliveryStartType.setValue(event.value);
    this.campaignStartSelection = event.value;
  }

  public loadHoldingFee(): void {

    if (this.subsHoldingFee) {
      this.subsHoldingFee.unsubscribe();
    }
    // this.subsHoldingFee = this.store.select(fromRoot.hasOrderSummaryPricingSuccessFailure)
    //   .pipe(filter((result: { success: boolean, failure: boolean }) => result.success || result.failure))
    //   .subscribe((result: { success: boolean, failure: boolean, orderSummary: OrderSummary }) => {
    //     if (this.subsHoldingFee) {
    //       this.subsHoldingFee.unsubscribe();
    //     }
    //   });
  }

  // public loadCampaignParameters(): void {

  //     this.store.select(fromRoot.hasCampaignParametersLoaded)
  //     .pipe(
  //       filter((isLoaded: boolean) => {
  //         return isLoaded
  //       }),
  //       switchMap(() => {
  //         return this.store.select(fromRoot.selectCampaignParameters)
  //       }),
  //     )
  //     .subscribe((campaignParameters: CampaignParameters) => {

  //       if (campaignParameters) {
  //         this.campaignParameters = campaignParameters;
  //         //retrieve the campaign parameters
  //         if (campaignParameters.timing && campaignParameters.timing.specificStartDate) {
  //           this.deliveryStartType.setValue(CampaignStart.SPECIFIC_DATE);
  //           this.campaignStartSelection = CampaignStart.SPECIFIC_DATE;
  //         } else {
  //           this.deliveryStartType.setValue(CampaignStart.AFTER_DROP_OFF);
  //           this.campaignStartSelection = CampaignStart.AFTER_DROP_OFF;
  //         }
  //       }
  //     })
  // }

  ngOnDestroy() {
  }
}
