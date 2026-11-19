import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { euroDefinition, initialAmount } from './field-format-test-data';

/** A field with a static `readonly` attribute, followed by one whose `readonly` comes from an `[attr.readonly]` binding. */
@Component({
  selector: 'entry-field-format-readonly-test-host',
  template: `<input entryFieldFormat readonly [formControl]="staticControl" [entryFieldFormatDefinition]="definition">
    <input entryFieldFormat [attr.readonly]="locked() ? '' : null" [formControl]="boundControl" [entryFieldFormatDefinition]="definition">`,
  imports: [ReactiveFormsModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatReadonlyTestHostComponent {
  readonly staticControl = new FormControl(initialAmount);
  readonly boundControl = new FormControl(initialAmount);
  readonly definition = euroDefinition;
  readonly locked = signal(true);
}
