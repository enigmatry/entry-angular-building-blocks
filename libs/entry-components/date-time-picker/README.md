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

- label: Label for the control
- placeholder: Placeholder for the control
- hint: Hint text for the control
- disabled: Whether the control is disabled, when not used with ReactiveForms  cannot be used in combination with reactive forms )
- showSeconds: Whether to show seconds in the time picker ( default: false )
- min: Minimum selectable date
- max: Maximum selectable date
- defaultTime: Default time for time picker component, if undefined sets default values to now.

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

- dateTimeChanged: Event emitted when the date time value changes

## Use the component

```html
<entry-date-time-picker [formControl]="dateTime" label="Expires on"></entry-date-time-picker>
```
