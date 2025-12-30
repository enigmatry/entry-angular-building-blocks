import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { EntryCellComponent } from './components/entry-cell/entry-cell.component';
import { EntryCellContextMenuComponent } from './components/entry-cell-context-menu/entry-cell-context-menu.component';
import { EntryCellFormattedValueComponent } from './components/entry-cell-formatted-value/entry-cell-formatted-value.component';
import { EntryTableComponent } from './components/entry-table/entry-table.component';
import { DEFAULT_PERCENTAGE_MULTIPLIER } from './interfaces';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    CommonModule,
    MatButtonModule,
    EntryTableComponent,
    EntryCellComponent,
    EntryCellContextMenuComponent,
    EntryCellFormattedValueComponent

  ],
  exports: [
    EntryTableComponent,
    EntryCellComponent,
    EntryCellContextMenuComponent,
    EntryCellFormattedValueComponent
  ],
  providers: [
    { provide: DEFAULT_PERCENTAGE_MULTIPLIER, useValue: 1 }
  ]
})
export class EntryTableModule { }
