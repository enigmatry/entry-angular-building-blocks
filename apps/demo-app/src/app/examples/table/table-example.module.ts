import { NgModule } from '@angular/core';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { TableExampleComponent } from './table-example/table-example.component';
import { EntryTableModule } from '@enigmatry/entry-components/table';

@NgModule({
  declarations: [
    TableExampleComponent
  ],
  imports: [
    CommonModule,
    EntryTableModule
  ],
  exports: [
    TableExampleComponent
  ],
  providers: [
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'dd-MM-yyyy HH:mm'}}
  ]
})
export class TableExampleModule { }
