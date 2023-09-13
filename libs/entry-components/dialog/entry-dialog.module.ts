import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryDialogService } from './entry-dialog.service';

@NgModule({
  declarations: [
    EntryDialogComponent,
    EntryAlertDialogComponent,
    EntryConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    EntryButtonModule
  ],
  exports: [
    EntryDialogComponent,
    EntryAlertDialogComponent,
    EntryConfirmDialogComponent
  ],
  providers: [EntryDialogService]
})
export class EntryDialogModule { }
