import { Component } from '@angular/core';
import { FileInputExampleModule } from '../../examples/file-input/file-input-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    templateUrl: './file-input-documentation.component.html',
    imports: [
        SharedModule,
        FileInputExampleModule,
    ]
})
export class FileInputDocumentationComponent {}
