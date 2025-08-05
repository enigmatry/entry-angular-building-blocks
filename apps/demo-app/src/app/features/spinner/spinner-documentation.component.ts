import { Component } from '@angular/core';
import { SpinnerExampleModule } from '../../examples/spinner/spinner-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    templateUrl: './spinner-documentation.component.html',
    imports: [
        SharedModule,
        SpinnerExampleModule
    ]
})
export class SpinnerDocumentationComponent { }
