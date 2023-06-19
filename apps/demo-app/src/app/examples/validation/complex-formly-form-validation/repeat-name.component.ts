import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-repeat-name',
  template: `
    <div style="width: 50%; margin-bottom: 10px;">
      <label>{{to.label}}:</label>
      <div *ngFor="let field of field.fieldGroup; let i = index">
        <span>{{i + 1}}. child</span>
        <formly-field [field]="field"></formly-field>
      </div>
    </div>
  `
})
export class RepeatNameComponent extends FieldArrayType {}
