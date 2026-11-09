import { NgModule } from '@angular/core';
import { FileInputBasicExampleComponent } from './file-input-basic-example/file-input-basic-example.component';
import { FileInputFormExampleComponent } from './file-input-form-example/file-input-form-example.component';
import { FileInputSignalFormExampleComponent } from './file-input-signal-form-example/file-input-signal-form-example.component';
import { FileInputValidationExampleComponent } from './file-input-validation-example/file-input-validation-example.component';

@NgModule({
  imports: [
    FileInputBasicExampleComponent,
    FileInputFormExampleComponent,
    FileInputValidationExampleComponent,
    FileInputSignalFormExampleComponent
  ],
  exports: [
    FileInputBasicExampleComponent,
    FileInputFormExampleComponent,
    FileInputValidationExampleComponent,
    FileInputSignalFormExampleComponent
  ]
})
export class FileInputExampleModule { }
