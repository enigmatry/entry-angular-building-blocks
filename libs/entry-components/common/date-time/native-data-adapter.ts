import { EntryDateAdapter } from "./entry-date-adapter";

export class EntryNativeDateAdapter extends EntryDateAdapter<Date> {
    getHours(date: Date): number {
        return date.getHours();
    }
    getMinutes(date: Date): number {
        return date.getMinutes();
    }
    getSeconds(date: Date): number {
        return date.getSeconds();
    }
    setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
        date.setHours(hours, minutes, seconds);
        return date;
    }
}