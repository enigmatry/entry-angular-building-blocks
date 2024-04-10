import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EntryDateTimePickerComponent } from "./entry-date-time-picker/entry-date-time-picker.component";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    declarations: [
        EntryDateTimePickerComponent
    ],
    exports: [
        EntryDateTimePickerComponent
    ]
})
export class EntryDateTimePickerModule { }