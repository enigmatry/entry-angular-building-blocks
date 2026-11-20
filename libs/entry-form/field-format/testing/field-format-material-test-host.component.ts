import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { euroDefinition, initialAmount } from './field-format-test-data';

/** A Material input with `disabledInteractive` on a disabled control, for which `matInput` sets `readonly` itself. */
@Component({
  selector: 'entry-field-format-material-test-host',
  template: `<mat-form-field>
    <input matInput disabledInteractive entryFieldFormat [formControl]="control" [entryFieldFormatDefinition]="definition">
  </mat-form-field>`,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatMaterialTestHostComponent {
  readonly control = new FormControl({ value: initialAmount, disabled: true });
  readonly definition = euroDefinition;
}
