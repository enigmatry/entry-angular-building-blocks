import { Component, Input, signal } from '@angular/core';
import { Message } from '../model/message';
import { getUser } from '../model/author-role-extensions';

@Component({
  selector: 'entry-assistant-message',
  templateUrl: './assistant-message.component.html',
  styleUrl: './assistant-message.component.scss'
})
export class AssistantMessageComponent {
  @Input() message: Message;
  readonly panelOpenState = signal(false);
  public role = getUser();
}