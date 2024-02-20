import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AlertExampleComponent } from './alert/alert-example.component';
import { ConfirmExampleComponent } from './confirm/confirm-example.component';
import { CustomDialogExampleComponent } from './custom/custom-dialog-example.component';
import { CustomDialogComponent } from './custom/custom-dialog.component';
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
import { ErrorDialogExampleComponent } from './error/error-example.component';

@NgModule({
  declarations: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
    CustomDialogComponent,
    ErrorDialogExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EntryDialogModule
  ],
  exports: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
    ErrorDialogExampleComponent
  ]
})
export class DialogExamplesModule { }
