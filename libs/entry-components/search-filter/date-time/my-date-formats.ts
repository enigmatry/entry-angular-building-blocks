import { MatDateFormats } from '@angular/material/core';

// https://date-fns.org/v2.16.1/docs/format
export const MY_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: ['Pp', 'P']
    },
    display: {
        dateInput: 'Pp',
        monthYearLabel: 'LLL uuuu',
        dateA11yLabel: 'PP',
        monthYearA11yLabel: 'LLLL uuuu',
    }
};
