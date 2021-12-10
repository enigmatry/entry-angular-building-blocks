import { InjectionToken } from '@angular/core';

export declare type FieldTypeMappings = { [key: string]: string };

export declare type FieldTypeResolverConfig = {
  readonlyDefaultPrefix?: string;
  fieldTypeMappings?: FieldTypeMappings;
  readonlyFieldTypeMappings?: FieldTypeMappings;
};

export declare type FormConfig = {
  fieldTypesConfig?: FieldTypeResolverConfig
};

export const ENIGMATRY_FORM_CONFIG = new InjectionToken<FormConfig>('ENIGMATRY_FORM_CONFIG');
