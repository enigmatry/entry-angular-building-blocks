import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ServerValidationMessagesComponent } from './server-validation-messages.component';
import { controlLevelErrorKey } from './server-validation.interface';

@NgModule({
    declarations: [
        ServerValidationMessagesComponent
    ],
    exports: [
        ServerValidationMessagesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forChild({
            validationMessages: [
                { name: controlLevelErrorKey, message: (error, _field) => error }
            ]
        })
    ]
})
export class ServerValidationModule { }
