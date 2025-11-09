import { Component } from '@angular/core';
import { EntryChatComponent } from '@enigmatry/entry-components';

@Component({
    selector: 'app-chat-example',
    imports: [EntryChatComponent],
    templateUrl: './chat-example.component.html',
    styleUrls: ['./chat-example.component.scss']
})
export class ChatExampleComponent {
}