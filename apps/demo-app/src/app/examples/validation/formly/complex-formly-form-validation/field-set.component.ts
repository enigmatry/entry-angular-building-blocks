import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'app-field-set',
    templateUrl: './field-set.component.html',
    standalone: false
})
export class FieldSetComponent extends FieldType {}
