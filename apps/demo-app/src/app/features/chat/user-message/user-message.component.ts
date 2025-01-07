import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../models/message';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent {
  @Output() send = new EventEmitter<Message>();
  @Output() pluginDialog = new EventEmitter();
  form: FormGroup;
  readonly acceptFileExtensions: ['md', 'txt', 'docx'];

  constructor() {
    this.form = this.createForm();
  }

  public sendMessage() {
    const messageCtrl = this.form.get('message');

    if (!messageCtrl?.value) {
      return;
    }

    const message = {
      content: messageCtrl?.value,
      role: 'user'
    };

    messageCtrl?.setValue('');

    this.send.emit(message);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      message: new FormControl()
    });
  }
}