// eslint-disable-next-line import/no-extraneous-dependencies
import { de, enUS, fr, nl, Locale } from 'date-fns/locale';
import { environment } from './environments/environment';

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
