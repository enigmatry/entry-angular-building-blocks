# Entry common

EntryCommonModule includes a set of commonly used directives, pipes, services and utilities.

`import { EntryCommonModule } from '@enigmatry/entry-components/common';`

## Directives

### `ScrollToInvalidControlDirective`

Scrolls to first invalid form control when form is submitted.

Selector: `form[formGroup],form[ngForm]`

Directive is applied to reactive or template driven forms, no additional selectors are required. Directive will listen to form submit event and scroll to first invalid form control when form is invalid. For this to work, submit button should be enabled so users always get feedback of what is wrong.
  
## Pipes

## Services