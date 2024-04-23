import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { EntryTimeAdapter } from '@enigmatry/entry-components';

@Component({
  selector: 'entry-time-picker',
  templateUrl: './time-picker.component.html',
})
export class EntryTimePickerComponent<D> implements OnChanges {

  @Input() date: D;
  @Input() is12HoursFormat: boolean;
  @Input() showSeconds: boolean;

  timeAdapter: EntryTimeAdapter<D> = inject(EntryTimeAdapter);

  hoursMeridian: number;
  minutes: number;
  seconds: number;
  isPm: boolean;

  private _12Hours = Array.from(Array(12), (_, i) => i + 1);
  private _24Hours = Array.from(Array(24), (_, i) => i);

  possibleMinutesAndSeconds = Array.from(Array(60), (_, i) => i);

  get possibleHours() {
    return this.is12HoursFormat ? this._12Hours : this._24Hours;
  }

  get hours(): number {
    if (!this.is12HoursFormat) {
      return this.hoursMeridian;
    }
    if (this.isPm) {
      return this.hoursMeridian === 12 ? 12 : this.hoursMeridian + 12;
    } else {
      return this.hoursMeridian === 12 ? 0 : this.hoursMeridian;
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update() {
    this.hoursMeridian = this.timeAdapter.getHours(this.date) ?? 0;
    this.minutes = this.timeAdapter.getMinutes(this.date) ?? 0;
    this.seconds = this.timeAdapter.getSeconds(this.date) ?? 0;
    this.isPm = this.hoursMeridian >= 12;

    if (this.is12HoursFormat) {
      if (this.hoursMeridian > 12) {
        this.hoursMeridian = this.hoursMeridian - 12;
      } else if (this.hoursMeridian === 0) {
        this.hoursMeridian = 12;
      }
    }
  }
}