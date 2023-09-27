import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent {
  extraFiles: ICodeFileDefinition[] = [{
    name: 'permissions.service.ts',
    path: 'permissions\\permissions-example\\permission.service',
    type: 'ts'
  },
  {
    name: 'permissions-example.module.ts',
    path: 'permissions\\permissions-example.module',
    type: 'ts'
  }];
}
