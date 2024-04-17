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

## Usage

Provide ENTRY_MAT_DATE_TIME and EntryDateAdapter in a feature or shared module:

```typescript
@NgModule({
  providers: [
    {
      provide: ENTRY_MAT_DATE_TIME,
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
    { provide: EntryDateAdapter, useClass: EntryNativeDateAdapter },
    ...
  ],
  ...
})
export class SharedModule { }
```

Use the component

```html
<entry-date-time-picker [formControl]="expiresOn" label="Expires on"></entry-date-time-picker>
```
