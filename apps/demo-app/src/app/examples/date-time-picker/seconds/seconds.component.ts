import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideEntryNativeTimeAdapter } from '@enigmatry/entry-components/common';
import { EntryDateTimePickerComponent } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-date-picker-seconds',
    templateUrl: './seconds.component.html',
    providers: [
        provideEntryNativeTimeAdapter({
            parse: {
                dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm:ss']
            },
            display: {
                dateInput: 'dd-MM-yyyy HH:mm:ss',
                monthYearLabel: 'LLL uuuu',
                dateA11yLabel: 'PP',
                monthYearA11yLabel: 'LLLL uuuu'
            }
        })
    ],
    imports: [EntryDateTimePickerComponent, ReactiveFormsModule]
})
export class SecondsComponent {
  dateTime = new FormControl(new Date());
}
