import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './dialog/alert/alert-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AlertWithImageComponent, CustomDialogComponent } from './dialog/custom/custom-dialog.component';
import { EntryDialogModule } from 'projects/entry-components/dialog/entry-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
export class ExamplesModule { }
