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
      name: 'alert-with-image.component.html',
      path: 'dialog\\custom\\alert-with-image.component',
      type: 'html'
    }
  ];
}
