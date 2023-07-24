import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { SharedModule } from '../../shared/shared.module';
import { TableExampleModule } from '../../examples/table/table-example.module';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableExampleModule,
    TableRoutingModule
  ]
})
export class TableModule { }
