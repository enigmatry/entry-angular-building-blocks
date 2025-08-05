import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-file-input-validation-example',
    templateUrl: './file-input-validation-example.component.html',
    styleUrls: ['./file-input-validation-example.component.scss'],
    standalone: false
})
export class FileInputValidationExampleComponent {
  form = new FormGroup({
    image: new FormControl<File | undefined>(undefined, { validators: [Validators.required] })
  });
}
