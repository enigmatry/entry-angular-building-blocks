import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker-disable',
  templateUrl: './disable.component.html'
})
export class DisableComponent {
  disabled: boolean;
  dateTime = new FormControl(new Date());

  setDisabled(disabled: boolean) {
    disabled ? this.dateTime.disable() : this.dateTime.enable();
  }
}
