import { InjectionToken } from '@angular/core';

export declare interface FieldTypeMappings {
 [key: string]: string;
}

export declare interface FieldTypeResolverConfig {
  readonlyDefaultPrefix?: string;
  fieldTypeMappings?: FieldTypeMappings;
  readonlyFieldTypeMappings?: FieldTypeMappings;
}

export declare interface EntryFormConfig {
  fieldTypesConfig?: FieldTypeResolverConfig;
}

export const ENTRY_FORM_CONFIG = new InjectionToken<EntryFormConfig>('ENTRY_FORM_CONFIG');
