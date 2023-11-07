# Entry common

EntryCommonModule includes a set of commonly used directives, pipes, services and utilities.

`import { EntryCommonModule } from '@enigmatry/entry-components/common';`

## Directives

### `ScrollToInvalidControlDirective`

Scrolls to first invalid form control when form is submitted.

Selector: `form[formGroup],form[ngForm]`

Directive is applied to reactive or template driven forms, no additional selectors are required. Directive will listen to form submit event and scroll to first invalid form control when form is invalid. For this to work, submit button should be enabled so users always get feedback of what is wrong.

## Event plugins

Extending Angular events binding syntax with debounce and throttle event plugins.

When binding to events in Angular we can add debounce or throttle modifier after the event name:
* using the event binding syntax "`(click.debounce)="onSave()`"
* or HostListener "`@HostListener('keyup.throttle')`".

Example: Debouncing a click event with default delay
```html
<button (click.debounce)="onClick($event)">
```
Example: Debouncing a keyup event with custom delay
```html
<input (keyup.debounce.1000)="doSomething($event)">
```

Example: Throttling a click event with default delay
```html
<input (keyup.throttle)="onKeyUp($event)">
```
Example: Throttle a keyup event with custom delay
```html
<input (keyup.throttle.1000)="onKeyUp($event)">
```

Modifier options `keyup.debounce.1000.leading`
* event name e.g. `keyup`
* modifier: `debounce` or `throttle`
* milliseconds: delay in milliseconds before the event handler is executed
* option: `leading` or `trailing`. If set to 'leading', the event handler is executed on the leading edge of the debounce timeout. If set to 'trailing', it's executed on the trailing edge.


Difference between `debounce` and `throttle`
* Debouncing waits for a certain time before invoking the function again.
* Debouncing ensures that the function is called only once, even if the event is triggered multiple times.
* Throttling limits the number of times the function can be called over a certain period.
* Throttling ensures that the function is called at a regular interval, even if the event is triggered multiple times.
  
## Pipes

## Services