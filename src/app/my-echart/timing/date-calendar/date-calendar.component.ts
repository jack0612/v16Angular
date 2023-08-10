import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ViewEncapsulation, Output, Input, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, of, switchMap } from 'rxjs';
import {  hasCampaignParametersLoaded, selectCalendarHolidays, selectCalendarPeriods, selectCampaignParameters, selectCustomerDetails } from '../store/calendar.selectors';
import { CampaignParameters } from '../models/campaign-parameters.model';
import { DateUtils } from '../utils/date.utils';
 
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppIconRepo } from '../models/app-icon-repo';
import { CalendarHolidays, Holidays } from '../models/calendar-holidays.model';
import { PeriodRange, CalendarPeriods } from '../models/calendar-periods.model';
import { CampaignStart } from '../models/delivery-timing.model';
import { CalendarEventService } from './date-calendar-event.service';
 
import { AppState } from '../store/app.state';
import { getCalendarHolidays, getCalendarPeriods } from '../store/calendar.actions';
import { CustomerDetails } from '../models/customer-details.model';
import { SubSink } from '../utils/subsink';
import { DateCalendarHeaderComponent } from '../date-calendar-header/date-calendar-header.component';
import { PickerDateAdapter, PICK_FORMATS } from '../services/date-calendar-picker-format';
 
 

@Component({
  selector: 'app-date-calendar',
  templateUrl: './date-calendar.component.html',
  styleUrls: ['./date-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:  [ CalendarEventService,
    {provide: DateAdapter, useClass: PickerDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}],
  encapsulation: ViewEncapsulation.None,
})



export class DateCalendarComponent implements OnInit, OnChanges {
  @ViewChild('datepickerFooter', {static: false}) datepickerFooter: ElementRef;
  @ViewChild('picker', {static: false}) picker: MatDatepicker<any>;
  @Output() setValidDate:EventEmitter<{value:Date, reset: boolean}> = new EventEmitter();
  @Output() setPeriod:EventEmitter<PeriodRange> = new EventEmitter();
  @Output() setDropOffBetween:EventEmitter<{dropOffStart: string, dropOffEnd: string}> = new EventEmitter();

  @Input() campaignStartSelection: CampaignStart;
  private _subs = new SubSink();
  toggleIcon: string = 'date_calendar_icon';

  periods: CalendarPeriods;
  calendarHolidays: CalendarHolidays;
  calendarHeader = DateCalendarHeaderComponent;
  iconRepo = AppIconRepo;
  campaignSelectionType: typeof CampaignStart = CampaignStart;
  holidayWeekendFilter: any;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  isCurrent:boolean = true;
  selectedDate: Date = new Date();
  holidayInput = { //TODO: this should be picked up from anaysis service.
    postalCode: 'K2G4M9',
    date: '20221201'
  }
  selectDateLabel: string = null;
  selectedOnSpecific: boolean = false;

  constructor(public translate: TranslateService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    private calendarEventService: CalendarEventService,
    public store: Store< AppState>) {

      this.calendarHolidays = new CalendarHolidays();
      this.calendarHolidays.holidays = new Holidays();
      this.matIconRegistry.addSvgIcon(
        'date_calendar_icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl(AppIconRepo.CALENDAR_DEFAULT)
      );
      this.matIconRegistry.addSvgIcon(
        'date_calendar_icon_error',
        this.domSanitizer.bypassSecurityTrustResourceUrl(AppIconRepo.CALENDAR_ERROR)
      );
      this.matIconRegistry.addSvgIcon(
        'date_calendar_icon_success',
        this.domSanitizer.bypassSecurityTrustResourceUrl(AppIconRepo.CALENDAR_COMPLETE)
        );
    }

  ngOnChanges(changes: SimpleChanges): void {
    const campaignStartSelection = changes['campaignStartSelection'];
    if (campaignStartSelection) {
      const value = campaignStartSelection.currentValue;
      if (value == this.campaignSelectionType.AFTER_DROP_OFF) {
        this.selectDateLabel = 'EASYFLOW.ORDER_ENTRY.PANELS.TIMING.SELECT_DROP_OFF_DATE';
        this.selectedOnSpecific = false;
        this._setupPeriods(false);
        if (!campaignStartSelection.isFirstChange()) {
          this.picker.select(undefined)
        }
      } else if (value == this.campaignSelectionType.SPECIFIC_DATE) {
        this.selectDateLabel = 'EASYFLOW.ORDER_ENTRY.PANELS.TIMING.SELECT_DELIVERY_START_DATE';
        this.selectedOnSpecific = true;
        this._setupPeriods(true);
        if (!campaignStartSelection.isFirstChange()) {
          this.picker.select(undefined)
        }
      }
    }
  }

    onOpen() {
      this._appendFooter();
    }

    //handle the date change validation and icons.
    validateSelectedDate(date: Date){
      if (date === undefined){
        //not defined - caused from toggling the drop-off date, reset the value
        this.toggleIcon = 'date_calendar_icon';
        this.setValidDate.emit({value: null, reset:true});
      } else if (date === null || this._isHoliday(date) || !this._isWithinPeriodRange(date)) {
        this.toggleIcon = 'date_calendar_icon_error';
        this.setValidDate.emit({value: null, reset:false}); //sending a null will indicates an invalid entry used in error validation
      } else {

        if (this.selectedOnSpecific) this._calculateDropOffDates(date); //calculate the drop off dates; only for valid dates.
        this.toggleIcon = 'date_calendar_icon_success';
        this.setValidDate.emit({value: date, reset:false});
      }
    }

    /**
     * The drop-off date for specific day is always three days before the selected date to the date before.
     * For example, if February 15, 2023 is selected, then the mail package must be dropped off from
     * February 10, 2023 and February 14, 2023. This range selects three days as work days, and excludes
     * weekends. Also, the bound for the minimum drop-off date is today or minimum period, which ever occurs first.
     * @param inputDate Date to backtrace the valid drop off date
     */
    private _calculateDropOffDates(inputDate: Date){
        //drop off dates should only be calculated if the selection is specific drop off date
        //1. Use the selected date input and decrement by one to start calculating the drop-off max value.
        let dropOffMax:Date = new Date(inputDate);
        dropOffMax.setDate(dropOffMax.getDate() - 1); //decrement one day and check if this is a valid work day
        dropOffMax.setDate(dropOffMax.getDate() - this._calculateDropOffBetween(dropOffMax))

        //2. From the drop-off max value, keep going back one day at a time, until a work day is slected.
        let dropOffMin:Date = new Date(dropOffMax);
        dropOffMin.setDate(dropOffMin.getDate() - 1);
        dropOffMin.setDate(dropOffMin.getDate() - this._calculateDropOffBetween(dropOffMin));

        //3. Prevent checks that are before today. If it's not today, then go back another and check.
        if (!this._isDateEqual(dropOffMin, new Date())) {

          dropOffMin.setDate(dropOffMin.getDate() - 1);
          dropOffMin.setDate(dropOffMin.getDate() - this._calculateDropOffBetween(dropOffMin));
        };

        //emit the final calculated drop off dates for the timing component to process.
        this.setDropOffBetween.emit(
        {
          dropOffStart: dropOffMin.toString(),
          dropOffEnd: dropOffMax.toString()
        });
    }

    //Used for calculating the dates for the message displayed in the summary view for second radio button.
    private _calculateDropOffBetween(inputDate: Date): number{

      const today: Date = new Date();
      const minDate = new Date(this.minDate);
      minDate.setDate(minDate.getDate() - 1);
      const checkDate = new Date(inputDate);
      let decBy: number = 0;

      //Keep checking until we have a valid work day.
      const getWorkday = () => {
        //max bound is set to today, or min period date.
        //The two min date checks are only safes, but should not be hit as this only allows for valid dates.
        if (this._isDateEqual(checkDate, today) || this._isDateEqual(checkDate, minDate) || checkDate.getTime() <= minDate.getTime()){
          return;
        }else if (this._isHoliday(checkDate) || this._isWeekend(checkDate)){
          decBy++;
          checkDate.setDate(checkDate.getDate() - 1); //now check the day before
          getWorkday();
        }else return;
      }
      getWorkday();
      return decBy;
    }

    //Checks the input received either entering manually, or from the calendar
    dateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {

      this.validateSelectedDate(event.value);
    }

    //used to enable css styles on the datepicker object
    dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
      // Only highlight dates inside the month view.
      if (view === 'month') {
        const holiday: Date = this._isHoliday(cellDate);
        const isWeekend: boolean = this._isWeekend(cellDate);
        if (isWeekend) {
          return 'oe-date-calendar-weekend'
        } else if (holiday) {
          return 'oe-date-calendar-holidays'
        } else if (!this._isWithinPeriodRange(cellDate)) {
          return 'oe-date-calendar-out-of-range'
        } else {
          return 'oe-date-calendar-selectable'
        }
      }

      return '';
    };

    private _isDateEqual(inputDate: Date, compareTo: Date) {

    const isEqual = compareTo.getFullYear() === inputDate.getFullYear()
    && compareTo.getMonth() === inputDate.getMonth()
    && compareTo.getDate() === inputDate.getDate();
    return isEqual;
  }

  //Checks if the day of the week is a weekend.
  private _isWeekend(date:Date){
    const day = date.getDay();
    const isWeekend: boolean = (day === 0 || day === 6);
    return isWeekend;
  }

  //Check if date falls within the selectable period.
  private _isWithinPeriodRange(date: Date){
    if (!(this.minDate && this.maxDate) || !date) return false;
     
    const isDateGreaterThanMin: boolean = date.getTime() >= this.minDate.getTime();
    const isDateLessThanMax: boolean = date.getTime() <= this.maxDate.getTime();

    return isDateGreaterThanMin && isDateLessThanMax;
  }

  //checks againts the holidays if this date is a holiday
  private _isHoliday(date: Date):Date {

    const found = this.calendarHolidays.holidays.days.find((day) => {

          const isFound:boolean = ((day.getMonth() === date.getMonth()) &&
                                   (day.getDate() === date.getDate()) &&
                                   (day.getFullYear() === date.getFullYear()));
              
          return isFound;
        })

    return found;
  }

  private _setupPeriods(specificDate?: boolean) {

    //if the period selected is the current one, the min/max is from the current
    //period. else, from the pending period.
    const today: Date = new Date();

    //Setting the allowable selections as the beginning of the current effective period
    //to the end of the pending expiry period. This is so both period selections are available.
    if (this.periods){
      this.minDate = new Date(this.periods.current.effectiveDate);
      this.maxDate = new Date(this.periods.pending.expiryDate);
    };

    //If the minDate from the period is less than today, then
    //make today the min date.
    //Adjust date picker's timezone using the offset.
    this.minDate = new Date(this.minDate.getTime() + (this.minDate.getTimezoneOffset() * 60000));

    if (this.minDate.getTime() < today.getTime()) {

      this.minDate.setFullYear(today.getFullYear());
      this.minDate.setMonth(today.getMonth());
      this.minDate.setDate(today.getDate());
    }

    //Specific drop off date selected in the radio button
    if (specificDate){

      //For specific dates, the allowble min period is always two business days forward. Increment and
      //check for any holidays.
      this.minDate.setDate(this.minDate.getDate() + 1); //start checking tomorrow and onwards if it's holiday.
      this.minDate.setDate(this.minDate.getDate() + this._countHolidays(this.minDate))
      this.minDate.setDate(this.minDate.getDate() + 1);
      this.minDate.setDate(this.minDate.getDate() + this._countHolidays(this.minDate))

  }


    this.setPeriod.emit({
      effectiveDate: this.minDate.toString(),
      expiryDate: this.maxDate.toString()
    })
  }

  //Increment the date until the day to find the next work day
  private _countHolidays(minDate: Date): number{

    let incBy: number = 0;
    while (this._isHoliday(minDate) || this._isWeekend(minDate)){
      incBy++;
      minDate.setDate(minDate.getDate() + 1);
    }

    return incBy;
  }

  private _setupHolidays(){

    this.holidayWeekendFilter = (d: Date | null): boolean => {

      const date = (d || new Date());
      //Remove all dates that are holidays.
      //parse the holidays and make sure that the following date is not part of the holiday.
      const found:Date = this._isHoliday(date);

      //If the holiday is found, then omit it from the calendar selection.
      if (found || this._isWeekend(date)) return false;

      return true;
    }
  }

  private _appendFooter() {
    const matCalendar = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
    matCalendar.appendChild(this.datepickerFooter.nativeElement);
  }

  ngOnInit(): void {
    this.calendarEventService.isCloseCalendar.subscribe(isClose => {
      if (isClose) {

        this.picker.close();
      }
    });
    this.minDate.setUTCHours(0, 0, 0, 0); //set to the beginning of the day
    this.maxDate.setUTCHours(23, 59, 59);//set to the end of the day
    this.loadCampaignParameters();
    this.loadCustomerDetails();
    this.loadCalenderPeriods();
    this.loadCalenderHolidays();
  }

  public loadCampaignParameters(): void {

    this._subs.sink = this.store.select(hasCampaignParametersLoaded)
    .pipe(
        filter((isLoaded: boolean) => isLoaded),
        switchMap(() => this.store.select(selectCampaignParameters)),
      )
    .subscribe((campaignParameters: CampaignParameters) => {
      if (campaignParameters){
        this.selectedDate = JSON.parse(JSON.stringify(campaignParameters.timing.mailingDate), DateUtils.DateTimeReviver);
        this.selectedOnSpecific = campaignParameters.timing.specificStartDate;
      }
    })
  }

  public loadCalenderPeriods(): void {

    this._subs.sink = this.store.select( selectCalendarPeriods)
    .pipe(
      switchMap((calPeriods: CalendarPeriods) => {
        if (calPeriods === null){
          this.store.dispatch( getCalendarPeriods())
          return this.store.select(selectCalendarPeriods )
        }
        return of(calPeriods)
      })
    )
    .subscribe((calPeriods: CalendarPeriods) => {
      if (calPeriods) {
        this.periods = calPeriods;
        this._setupPeriods(this.selectedOnSpecific);
        //validate the selected date against the periods.
        this.validateSelectedDate(this.selectedDate);
      }
    });
  }

  public loadCustomerDetails(): void {

    //Retrieve the postalcode from the customer details
    this._subs.sink = this.store.select(selectCustomerDetails)
    .subscribe((retCustDets: CustomerDetails) => {

      if (retCustDets){
        //set the postal code and date (using today's for now)
        this.holidayInput.postalCode = retCustDets.postalCode;
        const dateArr = (new Date()).toISOString().substring(0,10).split("-");
        this.holidayInput.date = `${dateArr[0]}${dateArr[1]}${dateArr[2]}`
      }
    })
  }

  public loadCalenderHolidays(): void {

    //Retrieve the calendar holidays based on the postal code and date
    this._subs.sink = this.store.select(selectCalendarHolidays)
    .pipe(
      switchMap((calHolidays: CalendarHolidays) => {
        if (calHolidays === null){
          this.store.dispatch( getCalendarHolidays({postalCode: this.holidayInput.postalCode, date: this.holidayInput.date}))
          return this.store.select(selectCalendarHolidays)
        }
        return of(calHolidays)
      })
    )
    .subscribe((calHolidays: CalendarHolidays) => {
      if (calHolidays) {
        this.calendarHolidays = calHolidays;
        this._setupHolidays();
        //validate selected date based on the holidays
        this.validateSelectedDate(this.selectedDate);
      }
    })

  }
}

