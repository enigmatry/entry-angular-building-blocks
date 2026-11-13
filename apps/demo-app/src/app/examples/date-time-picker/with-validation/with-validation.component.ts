import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EntryDateTimePickerComponent } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-date-time-picker-with-validation',
    templateUrl: './with-validation.component.html',
    imports: [EntryDateTimePickerComponent, ReactiveFormsModule]
})
export class WithValidationComponent {
  dateTime = new FormControl(new Date(), [Validators.required]);
}
