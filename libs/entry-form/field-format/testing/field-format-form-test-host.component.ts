import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { euroDefinition, initialAmount } from './field-format-test-data';

@Component({
  selector: 'entry-field-format-form-test-host',
  template: '<form [formGroup]="form"><input entryFieldFormat formControlName="amount" [entryFieldFormatDefinition]="definition()"></form>',
  imports: [ReactiveFormsModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatFormTestHostComponent {
  readonly form = new FormGroup({ amount: new FormControl<number | null>(initialAmount, { updateOn: 'submit' }) });
  readonly definition = signal(euroDefinition);
}
