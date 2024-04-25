import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTRY_MAT_DATE_TIME_FORMATS } from '@enigmatry/entry-components';

@Component({
  selector: 'app-meridiem',
  templateUrl: './meridiem.component.html',
  providers: [
    {
      provide: ENTRY_MAT_DATE_TIME_FORMATS, useValue: {
        parse: {
          dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy hh:mm aaa'],
        },
        display: {
          dateInput: 'dd-MM-yyyy hh:mm aaa',
          monthYearLabel: 'LLL uuuu',
          dateA11yLabel: 'PP',
          monthYearA11yLabel: 'LLLL uuuu',
        }
      }
    }
  ]
})
export class MeridiemComponent {
  dateTime = new FormControl(new Date());
}
