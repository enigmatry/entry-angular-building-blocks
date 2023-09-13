import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-input-form-example',
  templateUrl: './file-input-form-example.component.html',
  styleUrls: ['./file-input-form-example.component.scss']
})
export class FileInputFormExampleComponent {
  selectedFile: File | undefined;

  form = new FormGroup({
    file: new FormControl<File | undefined>(undefined)
  });
}
