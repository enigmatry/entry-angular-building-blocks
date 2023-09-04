import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';
import { FileInputExampleComponent } from './file-input-example/file-input-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FileInputExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryFileInputModule
  ],
  exports: [
    FileInputExampleComponent
  ]
})
export class FileInputExampleModule { }
