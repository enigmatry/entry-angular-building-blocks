import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME } from './entry-date-time';
import { inject } from '@angular/core';


export const EXTENDED_DATE_FORMATS = () => {
    const formats = inject(MAT_DATE_FORMATS, { skipSelf: true });
    const dateTimeFormat = inject(ENTRY_MAT_DATE_TIME).dateTimeFormat;
    const result = ({ ...formats });
    const parseFormat = result.parse.dateInput;
    result.display.dateInput = dateTimeFormat;
    result.parse.dateInput = Array.isArray(parseFormat)
        ? parseFormat.push(dateTimeFormat)
        : [parseFormat, dateTimeFormat];
    return result;
};
