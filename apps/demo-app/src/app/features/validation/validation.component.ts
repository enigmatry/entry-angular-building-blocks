import { Component } from '@angular/core';
import { COMPONENT_DEFINITIONS } from '../../shared/models/component-definitions';
import { RouteSegments } from '../../shared/models/route-segments';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {
  componentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === RouteSegments.validation);
  formlyExtraFiles: ICodeFileDefinition[] = [
    {
      name: 'formly-validation-example.module.ts',
      path: 'validation\\formly\\formly-validation-example.module',
      type: 'ts'
    }
  ];
  reactiveFormExtraFiles: ICodeFileDefinition[] = [
    {
      name: 'reactive-form-validation-example.module.ts',
      path: 'validation\\reactive-form\\reactive-form-validation-example.module',
      type: 'ts'
    }
  ];
}
