import { Provider } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { provideEntryNativeTimeAdapter } from '@enigmatry/entry-components/common';
import { provideEntryValidationConfig } from '@enigmatry/entry-components/validation';

/**
 * The date adapter, formats and validation messages shared by the date time picker examples.
 * The documentation page provides them; an example that needs another format provides its own.
 */
export const provideDateTimePickerExamples = (): Provider[] => [
  {
    provide: MAT_DATE_FORMATS,
    useValue: MAT_DATE_FNS_FORMATS
  },
  {
    provide: DateAdapter,
    useClass: DateFnsAdapter,
    deps: [MAT_DATE_LOCALE]
  },
  provideEntryNativeTimeAdapter({
    parse: {
      dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm']
    },
    display: {
      dateInput: 'dd-MM-yyyy HH:mm',
      monthYearLabel: 'LLL uuuu',
      dateA11yLabel: 'PP',
      monthYearA11yLabel: 'LLLL uuuu'
    }
  }),
  provideEntryValidationConfig({
    validationMessages: [
      { name: 'required', message: 'This field is required.' }
    ]
  })
];
