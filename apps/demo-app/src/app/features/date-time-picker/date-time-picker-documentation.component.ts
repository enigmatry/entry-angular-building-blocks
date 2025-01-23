import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DateTimePickerExampleModule } from '../../examples/date-time-picker/date-time-picker-example.module';

@Component({
    templateUrl: './date-time-picker-documentation.component.html',
    imports: [
        SharedModule,
        DateTimePickerExampleModule
    ]
})
export class DateTimePickerDocumentationComponent {

}
