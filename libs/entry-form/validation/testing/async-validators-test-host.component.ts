import { Component, inject } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER } from '../entry-async-validator-resolver';
import { provideEntryAsyncValidators } from '../provide-entry-async-validators';

export const uniqueCode: AsyncValidatorFn = () => of({ uniqueCode: true });

@Component({
  selector: 'entry-async-validators-test-host',
  template: '',
  providers: [provideEntryAsyncValidators({ uniqueCode })]
})
export class AsyncValidatorsTestHostComponent {
  readonly resolve = inject(ENTRY_ASYNC_VALIDATOR_RESOLVER);
}
