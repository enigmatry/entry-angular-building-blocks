import { Component } from '@angular/core';
import { DialogExamplesModule } from '../../examples/dialog/dialog-examples.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    templateUrl: './dialog-documentation.component.html',
    imports: [
        SharedModule,
        DialogExamplesModule,
    ]
})
export class DialogDocumentationComponent { }
