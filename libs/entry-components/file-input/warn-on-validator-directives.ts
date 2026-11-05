import { inject, isDevMode } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '@angular/forms';

export const warnOnValidatorDirectives = (): void => {
  if (!isDevMode()) {
    return;
  }

  const validators = inject(NG_VALIDATORS, { self: true, optional: true });
  const asyncValidators = inject(NG_ASYNC_VALIDATORS, { self: true, optional: true });
  if (!validators && !asyncValidators) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(
    '[entry-file-input] A validator directive on the element is ignored: Angular composes validators only for a '
    + 'ControlValueAccessor, which this component no longer provides. '
    + `Put the rule on the control (e.g. Validators.required) or on the signal form's schema instead.`
  );
};
