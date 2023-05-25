import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';
import { COMPONENT_DEFINITIONS } from '../../shared/models/component-definitions';
import { RouteSegments } from '../../shared/models/route-segments';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  dialogComponentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === RouteSegments.dialog)[0];
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'custom-dialog.component.ts',
      path: 'dialog\\custom\\custom-dialog.component',
      type: 'ts'
    },
    {
      name: 'custom-dialog.component.html',
      path: 'dialog\\custom\\custom-dialog.component',
      type: 'html'
    }
  ];
}
