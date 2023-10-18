import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDynamicFormComponent } from './basic/basic-dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryFormsModule } from '@enigmatry/entry-components/forms';

@NgModule({
  declarations: [
    BasicDynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntryFormsModule
  ],
  exports: [
    BasicDynamicFormComponent
  ]
})
export class DynamicFormExampleModule { }
