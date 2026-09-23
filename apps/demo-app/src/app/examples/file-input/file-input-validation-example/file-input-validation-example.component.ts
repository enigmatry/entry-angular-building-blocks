import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileInputValue, maxFileCountValidator, maxFileSizeValidator } from '@enigmatry/entry-components/file-input';

const sizeLimitInKb = 100;
const fileCountLimit = 2;

@Component({
    selector: 'app-file-input-validation-example',
    templateUrl: './file-input-validation-example.component.html',
    styleUrl: './file-input-validation-example.component.scss',
    standalone: false
})
export class FileInputValidationExampleComponent {
  protected readonly form = new FormGroup({
    image: new FormControl<FileInputValue>(undefined, {
      validators: [Validators.required, maxFileSizeValidator(sizeLimitInKb), maxFileCountValidator(fileCountLimit)]
    })
  });
}
