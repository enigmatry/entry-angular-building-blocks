import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { EntryDateTimeAdapter } from '@enigmatry/entry-components/common';

export type meridiem = 'am' | 'pm';

@Component({
  selector: 'entry-time-picker',
  templateUrl: './time-picker.component.html',
  standalone: false,
  host: {
    class: 'entry-time-picker'
  }
})
export class EntryTimePickerComponent<D> {
  readonly timeAdapter = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  private readonly hoursInDay = 24;
  private readonly halfADay = 12;
  private readonly minutesInHour = 60;

  readonly date = input<D | undefined>(undefined);
  readonly showSeconds = input(false);
  readonly is12HourClock = input(false);
  readonly defaultTime = input<D | undefined>(undefined);

  /** Flipped by `update()`, whose job is to re-read `today()` - a value signals cannot track. */
  private readonly refresh = signal(false);

  /** Time the inputs describe. A fresh object each time, so the linked signals below always take it. */
  private readonly timeFromInputs = computed(() => {
    this.refresh();
    const now = this.timeAdapter.today();
    const date = this.date();
    const fallback = this.defaultTime() ?? now;

    const hours = date
      ? this.timeAdapter.getHours(date)
      : this.timeAdapter.getHours(fallback);

    return {
      hours: this.is12HourClock() ? this.toTwelveHour(hours) : hours,
      minutes: date
        ? this.timeAdapter.getMinutes(date)
        : this.timeAdapter.getMinutes(fallback),
      seconds: this.secondsFromSource(date),
      // read off the 24 hour value, before any conversion above
      meridiem: (hours >= this.halfADay ? 'pm' : 'am') as meridiem
    };
  });

  // Writable because the selects two-way bind to them, re-derived whenever the inputs change.
  readonly hours = linkedSignal({ source: this.timeFromInputs, computation: time => time.hours });
  readonly minutes = linkedSignal({ source: this.timeFromInputs, computation: time => time.minutes });
  readonly seconds = linkedSignal({ source: this.timeFromInputs, computation: time => time.seconds });
  readonly meridiem = linkedSignal({ source: this.timeFromInputs, computation: time => time.meridiem });

  readonly hours12 = Array.from(Array(this.halfADay), (_, i) => i + 1);
  readonly hours24 = Array.from(Array(this.hoursInDay), (_, i) => i);
  readonly sixty = Array.from(Array(this.minutesInHour), (_, i) => i);

  readonly possibleHours = computed(() => this.is12HourClock() ? this.hours12 : this.hours24);

  /** Re-reads the current time. Called by EntryDateTimePickerComponent when the calendar opens. */
  readonly update = (): void => {
    this.refresh.update(flag => !flag);
  };

  readonly to24HourClock = (): void => {
    if (!this.is12HourClock()) {
      return;
    }
    if (this.meridiem() === 'am' && this.hours() === this.halfADay) {
      this.hours.set(0);
    }
    if (this.meridiem() === 'pm' && this.hours() !== this.halfADay) {
      this.hours.update(hours => hours + this.halfADay);
    }
  };

  /** Falls back to zero rather than the current second, so a value committed twice does not drift. */
  private readonly secondsFromSource = (date: D | undefined): number => {
    if (this.showSeconds() && date) {
      return this.timeAdapter.getSeconds(date);
    }
    const defaultTime = this.defaultTime();
    return defaultTime ? this.timeAdapter.getSeconds(defaultTime) : 0;
  };

  private readonly toTwelveHour = (hours: number): number => {
    if (hours > this.halfADay) {
      return hours - this.halfADay;
    }
    return hours === 0 ? this.halfADay : hours;
  };
}
