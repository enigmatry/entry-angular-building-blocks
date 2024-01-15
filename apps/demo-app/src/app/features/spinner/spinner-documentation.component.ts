import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerExampleModule } from '../../examples/spinner/spinner-example.module';

@Component({
  standalone: true,
  templateUrl: './spinner-documentation.component.html',
  imports: [
    SharedModule,
    SpinnerExampleModule
  ]
})
export class SpinnerDocumentationComponent { }
