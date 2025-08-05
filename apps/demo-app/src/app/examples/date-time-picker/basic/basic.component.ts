import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-basic-date-time-picker',
    templateUrl: './basic.component.html',
    standalone: false
})
export class BasicComponent {
  dateTime = new FormControl();
}
