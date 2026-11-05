import { afterNextRender, inject, Injector, isDevMode } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '@angular/forms';

export const warnOnValidatorDirectives = (): void => {
  if (!isDevMode()) {
    return;
  }

  const injector = inject(Injector);
  // After render, not now: a validator directive that injects the component would close a DI cycle (NG0200).
  afterNextRender(() => {
    const validators = injector.get(NG_VALIDATORS, null, { self: true, optional: true });
    const asyncValidators = injector.get(NG_ASYNC_VALIDATORS, null, { self: true, optional: true });
    if (!validators && !asyncValidators) {
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(
      '[entry-file-input] A validator directive on the element is ignored: Angular composes validators only for a '
      + 'ControlValueAccessor, which this component no longer provides. '
      + `Put the rule on the control (e.g. Validators.required) or on the signal form's schema instead.`
    );
  });
};
