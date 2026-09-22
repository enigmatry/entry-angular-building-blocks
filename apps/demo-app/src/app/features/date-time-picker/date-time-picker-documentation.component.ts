import { Component } from '@angular/core';
import { DateTimePickerExampleModule } from '../../examples/date-time-picker/date-time-picker-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-date-time-picker-documentation',
    templateUrl: './date-time-picker-documentation.component.html',
    imports: [
        SharedModule,
        DateTimePickerExampleModule
    ]
})
export class DateTimePickerDocumentationComponent {

}
