import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideEntryNativeTimeAdapter } from '@enigmatry/entry-components';

@Component({
    selector: 'app-date-picker-meridiem',
    templateUrl: './meridiem.component.html',
    providers: [
        provideEntryNativeTimeAdapter({
            parse: {
                dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy hh:mm aaa'],
            },
            display: {
                dateInput: 'dd-MM-yyyy hh:mm aaa',
                monthYearLabel: 'LLL uuuu',
                dateA11yLabel: 'PP',
                monthYearA11yLabel: 'LLLL uuuu',
            }
        })
    ],
    standalone: false
})
export class MeridiemComponent {
  dateTime = new FormControl(new Date());
}
