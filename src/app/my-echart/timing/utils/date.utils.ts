export class DateUtils{
    private static dFormat: RegExp = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;  // startswith: 2022-11-29T22:06:55;
    
    public static DateTimeReviver(key: any, value: any): any 
    {
        if (typeof value === 'string' && (DateUtils.dFormat.exec(value))) {
            return new Date(value);
        }
        return value;
    }
}