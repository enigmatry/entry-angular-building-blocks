import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { ENTRY_CKEDITOR_OPTIONS, EntryCkeditorOptions } from './ckeditor-options';

@Component({
  selector: 'entry-formly-ckeditor',
  templateUrl: './formly-ckeditor.component.html'
})
export class FormlyCkeditorComponent extends FieldType {

  formControl: FormControl;

  editorBuild: CKEditor5.EditorConstructor;
  editorConfig: CKEditor5.Config = {};

  constructor(@Inject(ENTRY_CKEDITOR_OPTIONS) options: EntryCkeditorOptions) {
    super();
    this.editorBuild = options.build;
    this.editorConfig = {...this.editorConfig, ...options.config };
  }

  public onReady(editor: any) {

    // https://ckeditor.com/docs/ckeditor5/latest/features/read-only.html#hiding-toolbar-in-read-only-mode

    const toolbarElement = editor.ui.view.toolbar.element;
    toolbarElement.style.display = this.formControl.disabled ? 'none' : 'flex';
  }
}
