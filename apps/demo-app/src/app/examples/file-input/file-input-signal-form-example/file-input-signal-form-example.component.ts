import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { EntryFileInputComponent, FileInputValue, maxFileCount, maxFileSize } from '@enigmatry/entry-components/file-input';

const sizeLimitInKb = 100;
const fileCountLimit = 2;

/**
 * The file input under a signal form, where the limits are rules on the schema rather than inputs
 * on the component. The same rules are available as validators for a reactive form.
 */
@Component({
  selector: 'app-file-input-signal-form-example',
  templateUrl: './file-input-signal-form-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntryFileInputComponent, FormField, FormRoot, MatButton]
})
export class FileInputSignalFormExampleComponent {
  private readonly uploadModel = signal<{ attachments: FileInputValue }>({ attachments: null });

  protected readonly uploadForm = form(this.uploadModel, path => {
    required(path.attachments, { message: 'Select at least one file.' });
    maxFileSize(path.attachments, sizeLimitInKb, { message: `Every file has to be ${sizeLimitInKb} KB or smaller.` });
    maxFileCount(path.attachments, fileCountLimit, { message: `Select at most ${fileCountLimit} files.` });
  }, {
    submission: { action: () => Promise.resolve() }
  });
}
