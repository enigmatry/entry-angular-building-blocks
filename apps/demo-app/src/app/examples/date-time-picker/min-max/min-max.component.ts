import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryDateTimePickerComponent } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-date-picker-min-max',
    templateUrl: './min-max.component.html',
    imports: [EntryDateTimePickerComponent, ReactiveFormsModule]
})
export class MinMaxComponent {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  tenDays = 10 * 24 * 60 * 60 * 1000;
  minDate = new Date(new Date().getTime() - this.tenDays);
  maxDate = new Date(new Date().getTime() + this.tenDays);
  dateTime = new FormControl(new Date());
}
