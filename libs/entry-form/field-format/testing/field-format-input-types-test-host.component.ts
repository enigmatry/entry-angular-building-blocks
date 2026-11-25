import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { euroDefinition, initialAmount } from './field-format-test-data';

@Component({
  selector: 'entry-field-format-input-types-test-host',
  template: `<input type="text" entryFieldFormat [formControl]="control" [entryFieldFormatDefinition]="definition">
    <input type="checkbox" entryFieldFormat><input type="radio" entryFieldFormat><input type="file" entryFieldFormat>`,
  imports: [ReactiveFormsModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatInputTypesTestHostComponent {
  readonly control = new FormControl<number | null>(initialAmount);
  readonly definition = euroDefinition;
}
