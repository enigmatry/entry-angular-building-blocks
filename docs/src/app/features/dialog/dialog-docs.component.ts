import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-dialog-docs',
  templateUrl: './dialog-docs.component.html',
  styleUrls: ['./dialog-docs.component.scss']
})
export class DialogDocsComponent {
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'alert-with-image.component.html',
      path: 'dialog\\custom\\alert-with-image.component',
      type: 'html'
    }
  ];
}
