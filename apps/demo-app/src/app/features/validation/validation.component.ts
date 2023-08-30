import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {
  formlyExtraFiles: ICodeFileDefinition[] = [
    {
      name: 'formly-validation-example.module.ts',
      path: 'validation\\formly\\formly-validation-example.module',
      type: 'ts'
    },
    {
      name: 'validation.service.ts',
      path: 'validation\\validation.service',
      type: 'ts'
    }
  ];
  reactiveFormExtraFiles: ICodeFileDefinition[] = [
    {
      name: 'reactive-form-validation-example.module.ts',
      path: 'validation\\reactive-form\\reactive-form-validation-example.module',
      type: 'ts'
    },
    {
      name: 'validation.service.ts',
      path: 'validation\\validation.service',
      type: 'ts'
    }
  ];
}
