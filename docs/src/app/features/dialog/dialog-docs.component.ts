import { Component } from '@angular/core';
import { ICodeTabDefinition } from '../../shared/example-viewer/code-tab-definition.interface';

@Component({
  selector: 'app-dialog-docs',
  templateUrl: './dialog-docs.component.html',
  styleUrls: ['./dialog-docs.component.scss']
})
export class DialogDocsComponent {
  additionalTabs: ICodeTabDefinition[] = [
    {
      name: `alert-with-image.component.html`,
      path: `dialog\custom\alert-with-image.component`,
      type: 'html'
    }
  ];
}
