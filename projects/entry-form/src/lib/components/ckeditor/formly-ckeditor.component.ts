import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'entry-formly-ckeditor',
  templateUrl: './formly-ckeditor.component.html'
})
export class FormlyCkeditorComponent extends FieldType {

  formControl: FormControl;
  editor: any;

  public onReady(editor: any) {
    // https://ckeditor.com/docs/ckeditor5/latest/features/read-only.html#hiding-toolbar-in-read-only-mode

    const toolbarElement = editor.ui.view.toolbar.element;
    toolbarElement.style.display = this.formControl.disabled ? 'none' : 'flex';
  }
}
