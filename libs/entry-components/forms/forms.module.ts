import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EntryInputComponent } from './controls/input/input.component';
import { EntryCheckboxComponent } from './controls/checkbox/checkbox.component';
import { EntryTextareaComponent } from './controls/textarea/textarea.component';

@NgModule({
  declarations: [
    EntryInputComponent,
    EntryCheckboxComponent,
    EntryTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    EntryInputComponent,
    EntryCheckboxComponent,
    EntryTextareaComponent
  ]
})
export class EntryFormsModule { }
