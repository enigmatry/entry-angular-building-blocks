import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonExampleModule } from '../../examples/common/common-example.module';

@Component({
    templateUrl: './common-documentation.component.html',
    imports: [
        SharedModule,
        CommonExampleModule
    ]
})
export class CommonDocumentationComponent {
}
