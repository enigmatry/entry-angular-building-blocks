import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { FormlyAutocompleteComponent } from './formly-autocomplete.component';
import { CheckAutocompleteInputDirective } from './directives/check-autocomplete-input.directive';
import { DisplayWithAutocompletePipe } from './pipes/display-with-autocomplete.pipe';
import { FilterWithAutocompletePipe } from './pipes/filter-with-autocomplete.pipe';

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
