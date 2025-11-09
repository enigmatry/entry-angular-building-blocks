import { Component } from '@angular/core';
import { ChatExampleComponent } from '../../examples/chat-bot/chat-example.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
    templateUrl: './chat-documentation.component.html',
    imports: [
        SharedModule,
        ChatExampleComponent
    ]
})
export class ChatDocumentationComponent { }