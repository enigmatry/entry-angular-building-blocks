import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';
import { SharedModule } from '../../shared/shared.module';
import { AlertExampleComponent } from './alert/alert-example.component';
import { ConfirmExampleComponent } from './confirm/confirm-example.component';
import { CustomDialogExampleComponent } from './custom/custom-dialog-example.component';
import { CustomDialogComponent } from './custom/custom-dialog.component';
import { ErrorDialogExampleComponent } from './error/error-example.component';
import { FormDialogExampleComponent } from './form/form-dialog-example.component';
import { FormDialogComponent } from './form/form-dialog.component';

@NgModule({
  declarations: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
    CustomDialogComponent,
    ErrorDialogExampleComponent,
    FormDialogExampleComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EntryDialogModule,
    EntryValidationModule
  ],
  exports: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
    ErrorDialogExampleComponent,
    FormDialogExampleComponent
  ]
})
export class DialogExamplesModule { }
