import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../model/message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getUser } from '../model/author-role-extensions';

@Component({
  selector: 'entry-user-message',
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.scss'
})
export class UserMessageComponent {
  @Output() send = new EventEmitter<Message>();
  form: FormGroup;

  constructor(
    private readonly snackBar: MatSnackBar,
    // private readonly azureSearchClient: AzureSearchClient
  ) {
    this.form = this.createForm();
  }

  readonly filesSelected = (file: File | FileList) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onloadend = _ => {
      // this.upload(file);
    };
  };

  // private readonly upload = (file: File) =>
  //   this.azureSearchClient
  //     .uploadFile({ data: file, fileName: file.name })
  //     .subscribe(_ => this.snackBar.open('File successfully uploaded', '', { duration: 400 }));

  public sendMessage() {
    const messageCtrl = this.form.get('message');

    if (!messageCtrl?.value) {
      return;
    }

    const message = new Message({
      content: messageCtrl?.value,
      role: getUser()
    });

    messageCtrl?.setValue('');

    this.send.emit(message);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      message: new FormControl(),
      file: new FormControl()
    });
  }
}