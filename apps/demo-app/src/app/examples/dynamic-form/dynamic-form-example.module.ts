import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDynamicFormComponent } from './basic/basic-dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryDynamicFormModule } from '@enigmatry/entry-components/dynamic-form';

@NgModule({
  declarations: [
    BasicDynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntryDynamicFormModule
  ],
  exports: [
    BasicDynamicFormComponent
  ]
})
export class DynamicFormExampleModule { }
