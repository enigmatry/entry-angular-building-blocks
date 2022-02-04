import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'enigmatry-server-validation-messages',
    templateUrl: './server-validation-messages.component.html',
    styleUrls: ['./server-validation-messages.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerValidationMessagesComponent{
    @Input() errors: ValidationErrors | null;
}
