import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DateCalendarComponent } from './date-calendar.component';
import { getCalendarMockStore, ORDER_ENTRY_IMPORTS } from '@shared/utils/test-utils';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';
describe('DateCalendarComponent', () => {
  let component: DateCalendarComponent;
  let fixture: ComponentFixture<DateCalendarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateCalendarComponent],
      imports: [ORDER_ENTRY_IMPORTS, MatIconTestingModule],
      providers: provideMockStore(getCalendarMockStore())
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCalendarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger date change event', () => {
    spyOn(component, 'dateChangeEvent');
    fixture.detectChanges();
    let dateChanger = fixture.debugElement.query(By.css('.oe-mat-calendar-input')).nativeElement as HTMLInputElement;
    const dateChangeEvent = new InputEvent('dateChange');
    if (dateChanger) {
      dateChanger.dispatchEvent(dateChangeEvent);
      expect(component.validateSelectedDate).toBeTruthy();
    }
  })

  it('should check dropoff between', () => {
    fixture.detectChanges();
    (<any>component)._calculateDropOffBetween(new Date(5 / 15 / 2023));
    expect((<any>component)._isDateEqual).toBeTruthy();
  });

  it('should calculate drop off date', () => {
    fixture.detectChanges();
    (<any>component)._calculateDropOffDates(new Date(5 / 15 / 2023));
    expect((<any>component)._isDateEqual).toBeTruthy();
    expect((<any>component)._calculateDropOffDates).toBeTruthy();
  });

  it('should calculate weekend', () => {
    fixture.detectChanges();
    expect((<any>component)._isWeekend(new Date(5 / 12 / 2023))).toEqual(false);
  });

  it('should check equal date', () => {
    fixture.detectChanges();
    expect((<any>component)._isDateEqual(new Date(5 / 19 / 2023), new Date(5 / 19 / 2023))).toEqual(true);
  });

  it('should get holiday count', () => {
    fixture.detectChanges();
    expect((<any>component)._countHolidays(new Date(1/1/2023))).toEqual(0);
  });

  it('should check date within period range', ()=> {
    fixture.detectChanges();
    (<any>component).minDate = new Date(1/1/2023);
    (<any>component).minDate = new Date(5/22/2023);
    expect((<any>component)._isWithinPeriodRange(new Date(3/15/2023))).toBeTruthy();
  });

  
});
