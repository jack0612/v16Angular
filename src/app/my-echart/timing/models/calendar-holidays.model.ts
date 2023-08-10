import { DateUtils } from "../utils/date.utils";

 

export class Holidays {

    days:Date[] = [];
}

export class CalendarHolidays {

    holidays: Holidays;

    static convertToDate(dateString: string): Date {

        if (dateString === null || dateString.length === 0) return null;

        const date = new Date(dateString.replace(/-/g, '\/'));
        return date;
    }

    static toHolidays(resp: any): CalendarHolidays {

        const calHolidays = new CalendarHolidays();
        const holidays = resp.holidays;
        calHolidays.holidays = new Holidays();
        for (let hol of holidays){
          calHolidays.holidays.days.push(CalendarHolidays.convertToDate(hol))
        }

        return (JSON.parse(JSON.stringify(calHolidays), DateUtils.DateTimeReviver));
    }
}
