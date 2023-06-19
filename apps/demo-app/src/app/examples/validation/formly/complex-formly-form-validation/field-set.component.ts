import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-field-set',
  template: `<fieldset *ngIf="field.fieldGroup as fieldGroup" style="width: 50%; margin-bottom: 10px;">
              <legend>{{to.label}}</legend>
                  <formly-field *ngFor="let field of fieldGroup" [field]="field"></formly-field>
            </fieldset>`
})
export class FieldSetComponent extends FieldType {}
