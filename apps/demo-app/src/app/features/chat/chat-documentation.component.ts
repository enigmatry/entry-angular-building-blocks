import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChatExampleModule } from '../../examples/chat/chat-example.module';

@Component({
  standalone: true,
  templateUrl: './chat-documentation.component.html',
  imports: [
    SharedModule,
    ChatExampleModule
  ]
})
export class ChatDocumentationComponent {
}
