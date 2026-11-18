import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { euroDefinition, initialAmount } from './field-format-test-data';

/** A plain `<input>` (no `matInput`) whose control, definition and `[readonly]` binding a spec can change. */
@Component({
  selector: 'entry-field-format-test-host',
  template: `<input entryFieldFormat [formControl]="control()" [entryFieldFormatDefinition]="definition()" [readonly]="locked()">`,
  imports: [ReactiveFormsModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatTestHostComponent {
  readonly control = signal(new FormControl<number | null>(initialAmount));
  readonly definition = signal(euroDefinition);
  readonly locked = signal(false);
}
