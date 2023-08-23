import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  extraFiles = [
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
