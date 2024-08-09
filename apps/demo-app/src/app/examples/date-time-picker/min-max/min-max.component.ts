import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker-min-max',
  templateUrl: './min-max.component.html'
})
export class MinMaxComponent {
  tenDays = 10 * 24 * 60 * 60 * 1000;
  minDate = new Date(new Date().getTime() - this.tenDays);
  maxDate = new Date(new Date().getTime() + this.tenDays);
  dateTime = new FormControl(new Date());
}
