import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { EntryDateTimePickerModule } from '@enigmatry/entry-components/date-time-picker';

@Component({
    selector: 'app-date-picker-no-form-binding',
    templateUrl: './no-form-binding.component.html',
    imports: [EntryDateTimePickerModule, DatePipe]
})
export class NoFormBindingComponent {
  protected readonly dateTime = signal<Date | undefined>(undefined);
}
