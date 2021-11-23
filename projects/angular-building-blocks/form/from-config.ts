import { InjectionToken } from '@angular/core';

export interface EnigmatryFormConfig {
  resolveFieldType: (type: string, isReadonly: boolean) => string;
}

export class DefaultEnigmatryFormConfig implements EnigmatryFormConfig {
  resolveFieldType: (type: string, isReadonly: boolean) => string = (type: string) => type;
}

export const ENIGMATRY_FORM_CONFIG = new InjectionToken<EnigmatryFormConfig>('ENIGMATRY_FORM_CONFIG');
