import { Component } from '@angular/core';
import { CommonExampleModule } from '../../examples/common/common-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    templateUrl: './common-documentation.component.html',
    imports: [
        SharedModule,
        CommonExampleModule
    ]
})
export class CommonDocumentationComponent {
}
