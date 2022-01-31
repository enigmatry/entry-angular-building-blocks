import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'enigmatry-server-validation-messages',
    templateUrl: './server-validation-messages.component.html',
    styleUrls: ['./server-validation-messages.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerValidationMessagesComponent{
    @Input() messages: string[];
}
