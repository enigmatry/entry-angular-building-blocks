import { Injectable } from "@angular/core";

@Injectable()
export abstract class EntryTimeAdapter<D> {
    abstract getHours(date: D): number;
    abstract getMinutes(date: D): number;
    abstract getSeconds(date: D): number;
    abstract getUnixTimestamp(date: D): number;
    abstract setTime(date: D, hours: number, minutes: number, seconds: number): D;
}