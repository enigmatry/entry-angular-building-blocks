import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryDateTimePickerComponent } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-default-time',
    templateUrl: './default-time.component.html',
    imports: [EntryDateTimePickerComponent, ReactiveFormsModule]
})
export class DefaultTimeComponent {
  dateTime = new FormControl();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  defaultTime = new Date(0, 0, 0, 12, 0, 0);
}
