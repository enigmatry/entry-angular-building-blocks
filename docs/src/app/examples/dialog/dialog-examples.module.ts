import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryDialogModule } from 'projects/entry-components/dialog/entry-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AlertDialogComponent } from './alert/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { CustomDialogComponent, AlertWithImageComponent } from './custom/custom-dialog.component';

@NgModule({
  declarations: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    CustomDialogComponent,
    AlertWithImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EntryDialogModule
  ],
  exports: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    CustomDialogComponent,
  ]
})
export class DialogExamplesModule { }
