import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
    selector: 'app-repeat-name',
    templateUrl: './repeat-name.component.html',
    standalone: false
})
export class RepeatNameComponent extends FieldArrayType {}
