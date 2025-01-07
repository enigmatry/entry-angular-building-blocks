import { Component, Input, signal } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-assistant-message',
  templateUrl: './assistant-message.component.html',
  styleUrls: ['./assistant-message.component.scss']
})
export class AssistantMessageComponent {
  @Input() message: Message;
  readonly panelOpenState = signal(false);
  public role = 'user';
}