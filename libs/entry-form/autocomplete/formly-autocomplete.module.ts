import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { CheckAutocompleteInputDirective } from './check-autocomplete-input.directive';
import { DisplayWithAutocompletePipe } from './display-with-autocomplete.pipe';
import { FilterWithAutocompletePipe } from './filter-with-autocomplete.pipe';
import { FormlyAutocompleteComponent } from './formly-autocomplete.component';

@NgModule({
  declarations: [
    FormlyAutocompleteComponent,
    DisplayWithAutocompletePipe,
    FilterWithAutocompletePipe,
    CheckAutocompleteInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        { name: 'autocomplete', component: FormlyAutocompleteComponent, wrappers: ['form-field'] }
      ]
    })
  ]
})
export class FormlyAutocompleteModule { }
