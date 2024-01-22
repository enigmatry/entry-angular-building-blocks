import { EntryMatDateTime } from 'libs/entry-components/search-filter/date-time/entry-date-time';
import { environment } from './environments/environment';
import { de, enUS, fr, nl } from 'date-fns/locale';

export const getMatDateLocale = (): Locale => {
    switch (getCulture()) {
        case 'nl-NL':
            return nl;
        case 'fr-FR':
            return fr;
        case 'de-DE':
            return de;
        default:
            return enUS;
    }
};

export const entryMatDateTime: EntryMatDateTime<Date> = {
    dateTimeFormat: 'Pp',
    compareDate(first: Date, second: Date): number {
        return first.getTime() - second.getTime();
    }
};

const getCulture = (): string => {
    const culture = localStorage.getItem('language');
    if (!culture) {
        // eslint-disable-next-line no-console
        console.warn('Failed loading culture from local storage, using default ' +
            `'${environment.defaultCulture}' culture.`);
        return environment.defaultCulture;
    }
    return culture;
};
