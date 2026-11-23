import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, timer } from 'rxjs';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER, EntryFieldFormatDirective, provideEntryAsyncValidators } from '@enigmatry/entry-form';

const takenNames = ['admin', 'root'];
const validationDelayInMilliseconds = 500;
const initialPrice = 1234.5;
const initialQuantity = 1500;
const initialDiscount = 0.125;

const uniqueName: AsyncValidatorFn = control => timer(validationDelayInMilliseconds).pipe(
  map(() => takenNames.includes(String(control.value).toLowerCase()) ? { uniqueName: true } : null)
);

@Component({
  selector: 'app-field-format-example',
  templateUrl: './field-format-example.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, JsonPipe, EntryFieldFormatDirective],
  providers: [provideEntryAsyncValidators({ uniqueName })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormatExampleComponent {
  private readonly asyncValidatorResolver = inject(ENTRY_ASYNC_VALIDATOR_RESOLVER, { optional: true });

  protected readonly form = new FormGroup({
    name: new FormControl<string | null>('admin', {
      asyncValidators: this.asyncValidatorResolver ? [this.asyncValidatorResolver('uniqueName')] : [],
      updateOn: 'blur'
    }),
    price: new FormControl<number | null>(initialPrice),
    quantity: new FormControl<number | null>(initialQuantity),
    discount: new FormControl<number | null>(initialDiscount),
    createdOn: new FormControl({ value: new Date('2026-11-06T00:00:00'), disabled: true })
  });
}
