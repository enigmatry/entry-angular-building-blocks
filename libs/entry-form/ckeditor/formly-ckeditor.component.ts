import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  get control(): FormControl {
    return this.formControl as FormControl;
  }

  protected onReady(editor: CKEditor5.Editor): void {
    // https://ckeditor.com/docs/ckeditor5/latest/features/read-only.html#hiding-toolbar-in-read-only-mode
    const toolbarElement: unknown = editor['ui']?.view?.toolbar?.element;
    if (toolbarElement instanceof HTMLElement) {
      toolbarElement.style.display = this.formControl.disabled ? 'none' : 'flex';
    }
  }
}
