import { Component } from '@angular/core';
import { ButtonExampleModule } from '../../examples/button/button-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  templateUrl: './button-documentation.component.html',
  imports: [
    SharedModule,
    ButtonExampleModule,
  ]
})
export class ButtonDocumentationComponent {}
