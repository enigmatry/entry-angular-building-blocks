# Entry common

EntryCommonModule includes a set of commonly used directives, pipes, services and utilities.

`import { EntryCommonModule } from '@enigmatry/entry-components/common';`

## Directives

### AutoDisableSubmitButtonDirective

Auto disables submit button when form is submitted, unless disabling is handled manually.  

Selector: `button[entry-submit-button]:not([disabled])`

Properties

| Property  | Description |
| :-------- | :------------------------------------------------- |
| `@Input() autoDisableIntervalInMs = 2000;` | The time interval in milliseconds for which the submit button will remain disabled after form submission. Default value is 2000ms. |

### ScrollToInvalidControlDirective

Scrolls to first invalid form control when form is submitted.

Selector: `form[formGroup],form[ngForm]`

Directive is applied to reactive or template driven forms, no additional selectors are required. Directive will listen to form submit event and scroll to first invalid form control when form is invalid. For this to work, submit button should be enabled so users always get feedback of what is wrong.
  
## Pipes

## Services