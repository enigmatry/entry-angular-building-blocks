import { Component } from '@angular/core';
import { COMPONENT_DEFINITIONS } from '../../shared/models/component-definitions';
import { RouteSegments } from '../../shared/models/route-segments';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  tableComponentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === RouteSegments.button);
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'button-example.module.ts',
      path: 'button\\button-example.module',
      type: 'ts'
    }
  ];
}
