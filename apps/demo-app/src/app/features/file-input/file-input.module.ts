import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileInputRoutingModule } from './file-input-routing.module';
import { FileInputComponent } from './file-input.component';
import { SharedModule } from '../../shared/shared.module';
import { FileInputExampleModule } from '../../examples/file-input/file-input-example.module';

@NgModule({
  declarations: [
    FileInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileInputExampleModule,
    FileInputRoutingModule
  ]
})
export class FileInputModule { }
