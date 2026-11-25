import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { euroDefinition, initialAmount } from './field-format-test-data';

// matInput keeps a disabledInteractive field of a control that starts disabled enabled, and sets readonly on it.
@Component({
  selector: 'entry-field-format-material-test-host',
  template: `<mat-form-field>
    <input matInput entryFieldFormat [disabledInteractive]="interactive()" [formControl]="control" [entryFieldFormatDefinition]="definition">
  </mat-form-field>`,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatMaterialTestHostComponent {
  readonly control = new FormControl({ value: initialAmount, disabled: true });
  readonly definition = euroDefinition;
  readonly interactive = signal(true);
}
