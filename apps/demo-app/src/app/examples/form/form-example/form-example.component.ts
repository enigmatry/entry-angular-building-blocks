import { Component } from '@angular/core';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent {

  requiredFields = {
    name: () => true,
    type: () => true
  };

  onSubmitClick() {
    console.log('onClick triggered');
  }

  onSave() {
    console.log('onSave triggered');
  }
}
