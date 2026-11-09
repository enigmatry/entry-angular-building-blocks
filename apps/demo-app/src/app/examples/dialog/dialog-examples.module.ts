import { NgModule } from '@angular/core';
import { AlertExampleComponent } from './alert/alert-example.component';
import { ConfirmExampleComponent } from './confirm/confirm-example.component';
import { CustomDialogExampleComponent } from './custom/custom-dialog-example.component';
import { ErrorDialogExampleComponent } from './error/error-example.component';
import { FormDialogExampleComponent } from './form/form-dialog-example.component';

@NgModule({
  imports: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
    ErrorDialogExampleComponent,
    FormDialogExampleComponent
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
