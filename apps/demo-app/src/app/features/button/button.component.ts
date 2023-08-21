import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'button-example.module.ts',
      path: 'button\\button-example.module',
      type: 'ts'
    }
  ];
}
