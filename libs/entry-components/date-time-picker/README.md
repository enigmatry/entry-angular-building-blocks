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

Provide ENTRY_MAT_DATE_TIME in a feature or shared module:

```typescript
@NgModule({
  providers: [
    {
      provide: ENTRY_MAT_DATE_TIME,
      useValue: {
        matDateFormats: {
          parse: {
            dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm'],
          },
          display: {
            dateInput: 'dd-MM-yyyy HH:mm',
            monthYearLabel: 'LLL uuuu',
            dateA11yLabel: 'PP',
            monthYearA11yLabel: 'LLLL uuuu',
          },
        },
        getHours(date: Date): number {
          return date.getHours();
        },
        getMinutes(date: Date): number {
          return date.getMinutes();
        },
        getSeconds(date: Date): number {
          return date.getSeconds();
        },
        setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
          date.setHours(hours);
          date.setMinutes(minutes);
          date.setSeconds(seconds);
          return date;
        }
      }
    },
    ...
  ],
  ...
})
export class SharedModule { }
```

Use the component

```html
<entry-date-time-picker [datetimeControl]="expiresOn" label="Expires on"></entry-date-time-picker>
```
