import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntryTableModule } from '@enigmatry/entry-components/table';
import { TableExampleComponent } from './table-example/table-example.component';

@NgModule({
  imports: [
    CommonModule,
    EntryTableModule,
    TableExampleComponent
  ],
  exports: [
    TableExampleComponent
  ],
  providers: [
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd-MM-yyyy HH:mm' } }
  ]
})
export class TableExampleModule { }
