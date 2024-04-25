import { Component, HostBinding, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { EntryTimeAdapter } from '@enigmatry/entry-components/common';

export type meridiem = 'am' | 'pm';

@Component({
  selector: 'entry-time-picker',
  templateUrl: './time-picker.component.html'
})
export class EntryTimePickerComponent<D> implements OnChanges {
  @HostBinding('class') class = 'entry-time-picker';

  readonly timeAdapter: EntryTimeAdapter<D> = inject(EntryTimeAdapter);

  @Input() date: D;
  @Input() showSeconds: boolean;
  @Input() is12HourClock: boolean;

  hours = 0;
  minutes = 0;
  seconds = 0;
  meridiem: meridiem = 'am';

  readonly hours12 = Array.from(Array(12), (_, i) => i + 1);
  readonly hours24 = Array.from(Array(24), (_, i) => i);
  readonly sixty = Array.from(Array(60), (_, i) => i);

  get possibleHours() {
    return this.is12HourClock ? this.hours12 : this.hours24;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update() {
    this.hours = this.timeAdapter.getHours(this.date) ?? 0;
    this.minutes = this.timeAdapter.getMinutes(this.date) ?? 0;
    this.seconds = this.timeAdapter.getSeconds(this.date) ?? 0;
    this.meridiem = this.hours >= 12 ? 'pm' : 'am';

    if (this.is12HourClock) {
      this.to12HourClock();
    }
  }

  to12HourClock() {
    if (this.hours > 12) {
      this.hours = this.hours - 12;
    }
    if (this.hours === 0) {
      this.hours = 12;
    }
  }

  to24HourClock() {
    if (!this.is12HourClock) {
      return;
    }
    if (this.meridiem === "am" && this.hours === 12) {
      this.hours = 0;
    }
    if (this.meridiem == "pm" && this.hours != 12) {
      this.hours = this.hours + 12;
    }
  }
}
