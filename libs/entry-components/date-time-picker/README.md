# Entry Datetime picker

`EntryDateTimePicker` is an Angular component  that provides a custom date time picker implementation

## Setup

Import the [EntryDateTimePicker] in your NgModule:

```typescript
import { EntryDateTimePickerModule } from "@enigmatry/entry-components/date-time-picker";
@NgModule({
    imports: [
        EntryDateTimePickerModule
        ,...
    ],
    ...
})
export class MyModule {}
```

## Configuration

Provide ENTRY_MAT_DATE_TIME_FORMATS and EntryTimeAdapter in a feature or shared module:

```typescript
@NgModule({
  providers: [
    {
      provide: ENTRY_MAT_DATE_TIME_FORMATS,
      useValue: {
        parse: {
          dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm'],
        },
        display: {
          dateInput: 'dd-MM-yyyy HH:mm',
          monthYearLabel: 'LLL uuuu',
          dateA11yLabel: 'PP',
          monthYearA11yLabel: 'LLLL uuuu',
        }
      }
    },
    { provide: EntryTimeAdapter, useClass: EntryNativeTimeAdapter },
    ...
  ],
  ...
})
export class SharedModule { }
```

## Inputs

- value: The selected date and time. A model signal, so it two-way binds with `[(value)]` and is
  driven by the forms API when a form is bound.
- label: Label for the control
- placeholder: Placeholder for the control
- hint: Hint text for the control
- disabled: Whether the picker is disabled. Bound by the forms API from the field's own state, so
  bind it yourself only when no form is bound - to disable a bound control, disable the control.
- showSeconds: Whether to show seconds in the time picker ( default: false )
- min: Minimum selectable date
- max: Maximum selectable date
- defaultTime: Default time for time picker component, if undefined sets default values to now.

`touched`, `required` and `errors` are also inputs, bound by the forms API from the field's state.
They exist so the picker can show the asterisk and the validation message, and are not meant to be
bound by hand.

Configure seconds globally via `provideEntryDateTimePickerConfig` in feature or shared module:

```typescript
@NgModule({
  providers: [
    ...
    provideEntryDateTimePickerConfig({ showSeconds: true })
    ...
  ],
  ...
})
export class SharedModule { }
```

## Outputs

- dateTimeChanged: Every change of the value, including a programmatic write to a bound control
- valueChange: The `value` model's own output, so only the picker's own writes - a user edit reaches
  it, `boundControl.setValue(...)` does not. Bind `dateTimeChanged` if you need both.
- touch: Emitted on blur so the forms API can mark the field touched

## Methods

- focus(options?: FocusOptions): Focuses the visible date-time input. Signal forms reaches it through
  `field().focusBoundControl()`; a control that does not implement it gets the framework's fallback of
  focusing the host element, which here is not focusable.

## Use the component

The picker implements
[`FormValueControl`](https://angular.dev/guide/forms/signals/custom-controls), so reactive,
template-driven and signal forms all drive it:

```html
<entry-date-time-picker [formControl]="dateTime" label="Expires on"></entry-date-time-picker>
<entry-date-time-picker [(ngModel)]="dateTime" label="Expires on"></entry-date-time-picker>
<entry-date-time-picker [formField]="form.expiresOn" label="Expires on"></entry-date-time-picker>
```

Without a form, two-way bind the value:

```html
<entry-date-time-picker [(value)]="dateTime" label="Expires on"></entry-date-time-picker>
```
