import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'file-input-example.module.ts',
      path: 'file-input\\file-input-example.module',
      type: 'ts'
    }
  ];
}
