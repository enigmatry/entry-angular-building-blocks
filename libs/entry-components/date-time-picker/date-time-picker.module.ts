import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { EntryValidationModule } from "@enigmatry/entry-components/validation";
import { EntryDateTimePickerComponent } from "./date-time-picker.component";
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