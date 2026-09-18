import { Component } from '@angular/core';
import { TableExampleModule } from '../../examples/table/table-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-table-documentation',
    templateUrl: './table-documentation.component.html',
    imports: [
        SharedModule,
        TableExampleModule
    ]
})
export class TableDocumentationComponent { }
