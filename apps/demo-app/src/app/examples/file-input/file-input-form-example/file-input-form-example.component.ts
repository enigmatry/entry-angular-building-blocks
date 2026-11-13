import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToInvalidControlDirective } from '@enigmatry/entry-components/common';
import { FileInputValue, EntryFileInputComponent } from '@enigmatry/entry-components/file-input';

@Component({
    selector: 'app-file-input-form-example',
    templateUrl: './file-input-form-example.component.html',
    styleUrl: './file-input-form-example.component.scss',
    imports: [EntryFileInputComponent, FormsModule, ReactiveFormsModule, ScrollToInvalidControlDirective]
})
export class FileInputFormExampleComponent {
  protected selectedFile: FileInputValue = null;

  protected readonly standaloneControl = new FormControl<FileInputValue>(null);

  protected readonly form = new FormGroup({
    file: new FormControl<FileInputValue>(null)
  });
}
