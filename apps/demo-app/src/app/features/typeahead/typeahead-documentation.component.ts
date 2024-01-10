import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ButtonExampleModule } from '../../examples/button/button-example.module';
import { TypeaheadExampleModule } from '../../examples/typeahead/typeahead-example.module';

@Component({
  standalone: true,
  templateUrl: './typeahead-documentation.component.html',
  imports: [
    SharedModule,
    TypeaheadExampleModule,
  ]
})
export class TypeaheadDocumentationComponent { }
