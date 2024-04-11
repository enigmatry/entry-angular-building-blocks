import { NgModule } from "@angular/core";
import { DateTimePickerExampleComponent } from "./date-time-picker-example.component";
import { CommonModule } from "@angular/common";
import { EntryDateTimePickerModule } from "libs/entry-components/date-time-picker/entry-date-time-picker.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        DateTimePickerExampleComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        EntryDateTimePickerModule
    ],
    exports: [
        DateTimePickerExampleComponent
    ],
    providers: [
    ]
})
export class DateTimePickerExampleModule { }