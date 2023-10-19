import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDynamicFormComponent } from './basic/basic-dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryFormsModule } from '@enigmatry/entry-components/forms';
import { ReactiveFormExampleComponent } from './reactive/reactive-form-example.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplateDrivenFormExampleComponent } from './template-driven/template-driven-form-example.component';

@NgModule({
  declarations: [
    BasicDynamicFormComponent,
    ReactiveFormExampleComponent,
    TemplateDrivenFormExampleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryFormsModule
  ],
  exports: [
    BasicDynamicFormComponent,
    ReactiveFormExampleComponent,
    TemplateDrivenFormExampleComponent,
  ]
})
export class DynamicFormExampleModule { }
