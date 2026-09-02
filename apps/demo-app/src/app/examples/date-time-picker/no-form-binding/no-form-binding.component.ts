import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-date-picker-no-form-binding',
    templateUrl: './no-form-binding.component.html',
    standalone: false
})
export class NoFormBindingComponent {
  readonly dateTime = signal<Date | undefined>(undefined);
}
