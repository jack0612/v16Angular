import { DateUtils } from "../utils/date.utils";

 

export interface PeriodRange {
    effectiveDate: string;
    expiryDate: string;
}
export class CalendarPeriods {

    current: PeriodRange;
    pending: PeriodRange; 

    static convertToDate(dateString: string): Date{

        if (dateString === null) return null;
        const d = new Date(dateString);
        return d;
    }

    static toCalendarPeriods(resp: any): CalendarPeriods {

        const calPeriods = new CalendarPeriods();

        // For some reason the searlizer does not like the Date string even after using the reviver, 
        // as seen with the Holidays model; and, the serializer does not like toISOString format here. 
        calPeriods.current = {
            effectiveDate: (resp.current ? CalendarPeriods.convertToDate(resp.current.effectiveDate).toString() : null),
            expiryDate: (resp.current ? CalendarPeriods.convertToDate(resp.current.expiryDate).toString() : null)
        }
        calPeriods.pending = {
            effectiveDate: (resp.pending ? CalendarPeriods.convertToDate(resp.pending.effectiveDate).toString() : null),
            expiryDate: (resp.pending ? CalendarPeriods.convertToDate(resp.pending.expiryDate).toString() : null)
        }

        return JSON.parse(JSON.stringify(calPeriods), DateUtils.DateTimeReviver);
    }
}