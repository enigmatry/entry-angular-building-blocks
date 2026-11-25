import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { EntryFieldFormatDefinition } from '../entry-field-format-definition';

// A textarea reads a Windows line break in its value back as a line feed.
@Component({
  selector: 'entry-field-format-textarea-test-host',
  template: `<textarea entryFieldFormat [formControl]="control" [entryFieldFormatDefinition]="definition"></textarea>`,
  imports: [ReactiveFormsModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatTextareaTestHostComponent {
  readonly control = new FormControl('first line\r\nsecond line');
  readonly definition: EntryFieldFormatDefinition = { name: 'custom' };
}
