import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-time-picker-example',
  templateUrl: './date-time-picker-example.component.html'
})
export class DateTimePickerExampleComponent {
  tenDays = 10 * 24 * 60 * 60 * 1000;
  now = new Date().getTime();
  myDate = new FormControl(new Date());
  disabled = false;
  showSeconds = true;
  minDate = new Date(this.now - this.tenDays);
  maxDate = new Date(this.now + this.tenDays);
}
