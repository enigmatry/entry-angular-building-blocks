import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { EntryErrorDialogComponent } from './dialogs/error/entry-error-dialog.component';
import { EntryDialogService } from './entry-dialog.service';

@NgModule({
  declarations: [
    EntryDialogComponent,
    EntryAlertDialogComponent,
    EntryConfirmDialogComponent,
    EntryErrorDialogComponent
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
    EntryConfirmDialogComponent,
    EntryErrorDialogComponent
  ],
  providers: [EntryDialogService]
})
export class EntryDialogModule { }
