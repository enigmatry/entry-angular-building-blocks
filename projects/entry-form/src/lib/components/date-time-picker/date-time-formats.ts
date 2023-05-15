import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';

const DATE_TIME_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: 'dd-MM-yyyy HH:mm'
    },
    display: {
        dateInput: 'dd-MM-yyyy HH:mm',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM yyyy'
    }
};

export { DATE_TIME_FORMATS };
