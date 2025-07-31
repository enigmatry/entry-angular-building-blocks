import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';
import { EntryDateTimePickerComponent } from './date-time-picker.component';
import { EntryTimePickerComponent } from './time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        EntryValidationModule
    ],
    declarations: [
        EntryDateTimePickerComponent,
        EntryTimePickerComponent
    ],
    exports: [
        EntryDateTimePickerComponent
    ]
})
export class EntryDateTimePickerModule { }