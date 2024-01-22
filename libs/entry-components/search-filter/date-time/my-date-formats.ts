import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME } from './entry-date-time';
import { inject } from '@angular/core';


export const EXTENDED_DATE_FORMATS = () => {
    const formats = inject(MAT_DATE_FORMATS, { skipSelf: true });
    const entryMatDateTime = inject(ENTRY_MAT_DATE_TIME);
    const result = ({
        ...formats
    });
    result.display.dateInput = entryMatDateTime.dateTimeFormat;
    const parseFormat = result.parse.dateInput;
    result.parse.dateInput = Array.isArray(parseFormat)
        ? [...parseFormat, entryMatDateTime.dateTimeFormat]
        : [parseFormat, entryMatDateTime.dateTimeFormat];
    return result;
};
