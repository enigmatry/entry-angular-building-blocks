import { Component, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { ENTRY_CKEDITOR_OPTIONS, EntryCkeditorOptions } from './ckeditor-options';

@Component({
    selector: 'entry-formly-ckeditor',
    templateUrl: './formly-ckeditor.component.html',
    standalone: false
})
export class FormlyCkeditorComponent extends FieldType<FormlyFieldConfig> {
  editorBuild: CKEditor5.EditorConstructor;
  editorConfig: CKEditor5.Config = {};
  readonly ckeditorOptions: EntryCkeditorOptions;

  constructor() {
    super();
    this.ckeditorOptions = inject(ENTRY_CKEDITOR_OPTIONS);
    this.editorBuild = this.ckeditorOptions.build;
    this.editorConfig = { ...this.editorConfig, ...this.ckeditorOptions.config };
  }

  get control(): UntypedFormControl {
    return this.formControl as UntypedFormControl;
  }

  public onReady(editor: any) {
    // https://ckeditor.com/docs/ckeditor5/latest/features/read-only.html#hiding-toolbar-in-read-only-mode

    const toolbarElement = editor.ui.view.toolbar.element;
    toolbarElement.style.display = this.formControl.disabled ? 'none' : 'flex';
  }
}
