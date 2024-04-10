import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-time-picker-example',
  templateUrl: './date-time-picker-example.component.html'
})
export class DateTimePickerExampleComponent {
  myDate = new FormControl(new Date());
}
