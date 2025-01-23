import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'app-field-set',
    template: `<fieldset *ngIf="field.fieldGroup as fieldGroup" class="validation-field-group">
                <legend class="validation-group-legend">{{to.label}}</legend>
                <formly-field *ngFor="let field of fieldGroup" [field]="field"></formly-field>
            </fieldset>`,
    standalone: false
})
export class FieldSetComponent extends FieldType {}
