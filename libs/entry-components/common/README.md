# Entry common

EntryCommonModule includes a set of commonly used directives, pipes, services and utilities.

`import { EntryCommonModule } from '@enigmatry/entry-components/common';`

## Directives

### AutoDisableButtonDirective

Auto disables button after click or submit event, unless disabling is handled manually. Default auto disable interval is 2000ms (2sec).

Selector: `button[entry-auto-disable]:not([disabled])`

Usage

`<button mat-button entry-submit-button entry-auto-disable type="submit">Submit</button>`

or with custom disable interval in milliseconds

`<button mat-button entry-submit-button entry-auto-disable="5000" type="submit">Submit</button>`

### ScrollToInvalidControlDirective

Scrolls to first invalid form control when form is submitted.

Selector: `form[formGroup],form[ngForm]`

Usage

Directive is applied to reactive or template driven forms, no additional selectors are required. Directive will listen to form submit event and scroll to first invalid form control when form is invalid. For this to work, submit button should be enabled so users always get feedback of what is wrong.
  
## Pipes

## Services