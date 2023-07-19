import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableExampleComponent } from './table-example/table-example.component';
import { EntryTableModule } from 'libs/entry-table/src/public-api';

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
  ]
})
export class TableExampleModule { }
