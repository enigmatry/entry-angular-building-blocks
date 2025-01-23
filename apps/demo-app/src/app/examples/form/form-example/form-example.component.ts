import { Component } from '@angular/core';

@Component({
    selector: 'app-form-example',
    templateUrl: './form-example.component.html',
    styleUrls: ['./form-example.component.scss'],
    standalone: false
})
export class FormExampleComponent {
  requiredFields = {
    name: () => true,
    type: () => true
  };
}
