import { MatDateFormats } from '@angular/material/core';

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
