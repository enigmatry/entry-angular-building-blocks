import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScrollToInvalidControlDirective } from '@enigmatry/entry-components/common';
import {
  FileInputValue,
  maxFileCountValidator,
  maxFileSizeValidator,
  EntryFileInputComponent
} from '@enigmatry/entry-components/file-input';

const sizeLimitInKb = 100;
const fileCountLimit = 2;

@Component({
    selector: 'app-file-input-validation-example',
    templateUrl: './file-input-validation-example.component.html',
    styleUrl: './file-input-validation-example.component.scss',
    imports: [ScrollToInvalidControlDirective, ReactiveFormsModule, EntryFileInputComponent, JsonPipe]
})
export class FileInputValidationExampleComponent {
  protected readonly form = new FormGroup({
    image: new FormControl<FileInputValue>(null, {
      validators: [Validators.required, maxFileSizeValidator(sizeLimitInKb), maxFileCountValidator(fileCountLimit)]
    })
  });
}
