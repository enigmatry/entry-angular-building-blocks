import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'custom-dialog.component.html',
      path: 'dialog\\custom\\custom-dialog.component',
      type: 'html'
    }
  ];
}
