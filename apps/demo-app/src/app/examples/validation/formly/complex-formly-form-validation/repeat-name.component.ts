import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
    selector: 'app-repeat-name',
    template: `
    <div class="validation-children-names">
      <label class="description">{{props.label}}:</label>
      @for (field of field.fieldGroup; track field.name; let i = $index) {
        <div>
          <span>{{i + 1}}. child</span>
          <formly-field [field]="field"></formly-field>
        </div>
      }
    </div>
  `,
    standalone: false
})
export class RepeatNameComponent extends FieldArrayType {}
