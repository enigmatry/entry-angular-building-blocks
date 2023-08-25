import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'table-example.module.ts',
      path: 'table\\table-example.module',
      type: 'ts'
    },
    {
      name: 'users.ts',
      path: 'search-filter\\search-filter\\users',
      type: 'ts'
    }
  ];
}
