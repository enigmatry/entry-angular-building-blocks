import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-input-example',
  templateUrl: './file-input-example.component.html',
  styleUrls: ['./file-input-example.component.scss']
})
export class FileInputExampleComponent {
  selectedFile: File | undefined;
  control = new FormControl<File | undefined>(undefined);
}
