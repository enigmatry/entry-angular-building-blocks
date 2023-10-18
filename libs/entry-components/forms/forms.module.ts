import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EntryAutocompleteComponent } from './controls/autocomplete/autocomplete.component';
import { EntryCheckboxComponent } from './controls/checkbox/checkbox.component';
import { EntryDatePickerComponent } from './controls/date-picker/date-picker.component';
import { EntryInputComponent } from './controls/input/input.component';
import { EntrySelectComponent } from './controls/select/select.component';
import { EntryTextareaComponent } from './controls/textarea/textarea.component';

@NgModule({
  declarations: [
    EntryInputComponent,
    EntrySelectComponent,
    EntryCheckboxComponent,
    EntryTextareaComponent,
    EntryDatePickerComponent,
    EntryAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatAutocompleteModule
  ],
  exports: [
    EntryInputComponent,
    EntrySelectComponent,
    EntryCheckboxComponent,
    EntryTextareaComponent,
    EntryDatePickerComponent,
    EntryAutocompleteComponent
  ]
})
export class EntryFormsModule { }
