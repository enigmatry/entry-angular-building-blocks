import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EntryFieldFormatDirective } from '../entry-field-format.directive';
import { dateDefinition, initialDate } from './field-format-test-data';

@Component({
  selector: 'entry-field-format-date-test-host',
  template: '<input entryFieldFormat [formControl]="control" [entryFieldFormatDefinition]="definition">',
  imports: [ReactiveFormsModule, EntryFieldFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatDateTestHostComponent {
  readonly control = new FormControl<Date | string | null>(initialDate);
  readonly definition = dateDefinition;
}
