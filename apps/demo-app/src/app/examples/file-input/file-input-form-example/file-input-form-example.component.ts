import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileInputValue } from '@enigmatry/entry-components/file-input';

@Component({
    selector: 'app-file-input-form-example',
    templateUrl: './file-input-form-example.component.html',
    styleUrl: './file-input-form-example.component.scss',
    standalone: false
})
export class FileInputFormExampleComponent {
  protected selectedFile: FileInputValue = null;

  protected readonly standaloneControl = new FormControl<FileInputValue>(null);

  protected readonly form = new FormGroup({
    file: new FormControl<FileInputValue>(null)
  });
}
