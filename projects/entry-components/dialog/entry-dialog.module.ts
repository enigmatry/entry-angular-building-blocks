import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { EntryDialogService } from './entry-dialog.service';

@NgModule({
  declarations: [
    EntryDialogComponent,
    EntryAlertDialogComponent,
    EntryConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    EntryDialogComponent,
    EntryAlertDialogComponent,
    EntryConfirmDialogComponent
  ],
  providers: [EntryDialogService]
})
export class EntryDialogModule { }
