import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Message } from '../models/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'entry-chat-message',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './entry-chat-message.component.html',
  styleUrl: './entry-chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryChatMessageComponent {
  @Input() message: Message;
  panelOpenState = signal(false);
}
