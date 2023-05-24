import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './dialog/alert/alert.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { CustomDialogComponent } from './dialog/custom/custom-dialog.component';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    CustomDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AlertComponent,
    ConfirmComponent
  ]
})
export class ExamplesModule { }
