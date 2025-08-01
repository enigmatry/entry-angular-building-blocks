import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-default-time',
    templateUrl: './default-time.component.html',
    standalone: false
})
export class DefaultTimeComponent {
  dateTime = new FormControl();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  defaultTime = new Date(0, 0, 0, 12, 0, 0);
}
