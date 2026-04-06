import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'app-field-set',
    template: `@if (field.fieldGroup; as fieldGroup) {
                <fieldset class="validation-field-group">
                    <legend class="validation-group-legend">{{props.label}}</legend>
                    @for (field of fieldGroup; track field.name) {
                        <formly-field [field]="field"></formly-field>
                    }
                </fieldset>
            }`,
    standalone: false
})
export class FieldSetComponent extends FieldType {}
