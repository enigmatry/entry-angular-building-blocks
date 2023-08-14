import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { EntryDialogService } from './entry-dialog.service';
import { EntryButtonModule } from '@enigmatry/entry-components/button';

@NgModule({
  declarations: [
    EntryDialogComponent,
    EntryAlertDialogComponent,
    EntryConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
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
