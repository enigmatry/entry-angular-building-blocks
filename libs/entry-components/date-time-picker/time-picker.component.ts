import { Component, OnChanges, SimpleChanges, computed, inject, input, signal } from '@angular/core';
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
export class EntryTimePickerComponent<D> implements OnChanges {
  readonly timeAdapter = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  private readonly hoursInDay = 24;
  private readonly halfADay = 12;
  private readonly minutesInHour = 60;

  readonly date = input<D | undefined>(undefined);
  readonly showSeconds = input(false);
  readonly is12HourClock = input(false);
  readonly defaultTime = input<D | undefined>(undefined);

  // Writable rather than computed: the selects two-way bind to these, and the parent forces a
  // refresh through `update()`. Writing a signal marks the view, which is why the two
  // ChangeDetectorRef.markForCheck() calls these methods used to need are gone.
  readonly hours = signal(0);
  readonly minutes = signal(0);
  readonly seconds = signal(0);
  readonly meridiem = signal<meridiem>('am');

  readonly hours12 = Array.from(Array(this.halfADay), (_, i) => i + 1);
  readonly hours24 = Array.from(Array(this.hoursInDay), (_, i) => i);
  readonly sixty = Array.from(Array(this.minutesInHour), (_, i) => i);

  readonly possibleHours = computed(() => this.is12HourClock() ? this.hours12 : this.hours24);

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  readonly update = (): void => {
    const now = this.timeAdapter.today();
    const date = this.date();
    const fallback = this.defaultTime() ?? now;

    this.hours.set(date
      ? this.timeAdapter.getHours(date)
      : this.timeAdapter.getHours(fallback));

    this.minutes.set(date
      ? this.timeAdapter.getMinutes(date)
      : this.timeAdapter.getMinutes(fallback));

    this.seconds.set(this.showSeconds() && date
      ? this.timeAdapter.getSeconds(date)
      : this.timeAdapter.getSeconds(fallback));

    this.meridiem.set(this.hours() >= this.halfADay ? 'pm' : 'am');

    if (this.is12HourClock()) {
      this.to12HourClock();
    }
  };

  readonly to12HourClock = (): void => {
    if (this.hours() > this.halfADay) {
      this.hours.update(hours => hours - this.halfADay);
    }
    if (this.hours() === 0) {
      this.hours.set(this.halfADay);
    }
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
}
