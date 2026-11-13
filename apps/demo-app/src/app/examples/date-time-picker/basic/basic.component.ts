import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryDateTimePickerComponent } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-basic-date-time-picker',
    templateUrl: './basic.component.html',
    imports: [EntryDateTimePickerComponent, ReactiveFormsModule]
})
export class BasicComponent {
  dateTime = new FormControl();
}
