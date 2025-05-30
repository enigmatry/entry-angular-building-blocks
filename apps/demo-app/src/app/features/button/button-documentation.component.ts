import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ButtonExampleModule } from '../../examples/button/button-example.module';

@Component({
    templateUrl: './button-documentation.component.html',
    imports: [
        SharedModule,
        ButtonExampleModule,
    ]
})
export class ButtonDocumentationComponent { }
