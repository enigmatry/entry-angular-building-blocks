import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './dialog/alert/alert.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { AlertWithImageComponent, CustomDialogComponent } from './dialog/custom/custom-dialog.component';
import { EntryDialogModule } from 'projects/entry-components/entry-dialog/entry-dialog.module';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    CustomDialogComponent,
    AlertWithImageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntryDialogModule
  ],
  exports: [
    AlertComponent,
    ConfirmComponent,
    CustomDialogComponent,
  ]
})
export class ExamplesModule { }
