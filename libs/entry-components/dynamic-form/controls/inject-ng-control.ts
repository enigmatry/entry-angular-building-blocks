// see:
// https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55

import { inject } from '@angular/core';
import { NgControl, FormControlDirective, FormControlName, NgModel } from '@angular/forms';

export function injectNgControl() {
  const ngControl = inject(NgControl, { self: true, optional: true });

  if (ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel) {
    return ngControl;
  }
  return undefined;
}
