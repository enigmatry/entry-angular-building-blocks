import { Component } from '@angular/core';
import { BasicComponent } from '../../examples/date-time-picker/basic/basic.component';
import { provideDateTimePickerExamples } from '../../examples/date-time-picker/date-time-picker-example.providers';
import { DefaultTimeComponent } from '../../examples/date-time-picker/default-time/default-time.component';
import { DisableComponent } from '../../examples/date-time-picker/disable/disable.component';
import { MeridiemComponent } from '../../examples/date-time-picker/meridiem/meridiem.component';
import { MinMaxComponent } from '../../examples/date-time-picker/min-max/min-max.component';
import { NoFormBindingComponent } from '../../examples/date-time-picker/no-form-binding/no-form-binding.component';
import { SecondsComponent } from '../../examples/date-time-picker/seconds/seconds.component';
import { SignalFormComponent } from '../../examples/date-time-picker/signal-form/signal-form.component';
import { WithValidationComponent } from '../../examples/date-time-picker/with-validation/with-validation.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-date-time-picker-documentation',
    templateUrl: './date-time-picker-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        BasicComponent,
        DefaultTimeComponent,
        DisableComponent,
        MeridiemComponent,
        MinMaxComponent,
        NoFormBindingComponent,
        SecondsComponent,
        SignalFormComponent,
        WithValidationComponent
    ],
    providers: [provideDateTimePickerExamples()]
})
export class DateTimePickerDocumentationComponent {

}
