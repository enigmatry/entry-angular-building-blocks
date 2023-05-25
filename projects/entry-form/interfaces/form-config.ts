import { InjectionToken } from '@angular/core';

export declare type FieldTypeMappings = { [key: string]: string };

export declare type FieldTypeResolverConfig = {
  readonlyDefaultPrefix?: string;
  fieldTypeMappings?: FieldTypeMappings;
  readonlyFieldTypeMappings?: FieldTypeMappings;
};

export declare type EntryFormConfig = {
  fieldTypesConfig?: FieldTypeResolverConfig;
};

export const ENTRY_FORM_CONFIG = new InjectionToken<EntryFormConfig>('ENTRY_FORM_CONFIG');
