import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';
import { SharedModule } from '../../shared/shared.module';
import { FileInputBasicExampleComponent } from './file-input-basic-example/file-input-basic-example.component';
import { FileInputFormExampleComponent } from './file-input-form-example/file-input-form-example.component';
import { FileInputValidationExampleComponent } from './file-input-validation-example/file-input-validation-example.component';

@NgModule({
  declarations: [
    FileInputBasicExampleComponent,
    FileInputFormExampleComponent,
    FileInputValidationExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryFileInputModule
  ],
  exports: [
    FileInputBasicExampleComponent,
    FileInputFormExampleComponent,
    FileInputValidationExampleComponent
  ]
})
export class FileInputExampleModule { }
