import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-date-time-picker-with-validation',
    templateUrl: './with-validation.component.html',
    standalone: false
})
export class WithValidationComponent {
  dateTime = new FormControl(new Date(), [Validators.required]);
}
