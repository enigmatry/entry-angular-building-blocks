import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { EntryDateTimePickerComponent } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-date-picker-disable',
    templateUrl: './disable.component.html',
    imports: [MatCheckbox, FormsModule, EntryDateTimePickerComponent, ReactiveFormsModule]
})
export class DisableComponent {
  disabled: boolean;
  dateTime = new FormControl(new Date());
  anotherDateTime = new Date();

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.dateTime.disable();
    } else {
      this.dateTime.enable();
    }
  }
}
