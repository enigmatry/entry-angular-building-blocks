import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-date-picker-disable',
    templateUrl: './disable.component.html',
    standalone: false
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
