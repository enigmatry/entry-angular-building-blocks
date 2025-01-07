import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'entry-chat',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './entry-chat.component.html',
  styleUrl: './entry-chat.component.scss'
})
export class EntryChatComponent {

}
