import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-date-time-picker',
  templateUrl: './basic.component.html'
})
export class BasicDateTimePickerComponent {
  dateTime = new FormControl(new Date());
}
