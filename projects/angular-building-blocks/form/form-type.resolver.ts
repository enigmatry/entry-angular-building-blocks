import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ENIGMATRY_FORM_CONFIG, FormConfig, FieldTypeResolverConfig, FieldTypeMappings } from './form-config';

export declare type FieldTypeResolver = (type: string, isReadonly: boolean) => string;

export const ENIGMATRY_FIELD_TYPE_RESOLVER = new InjectionToken<FieldTypeResolver>('ENIGMATRY_FIELD_TYPE_RESOLVER');

export const fieldTypeResolverFactory = (service: FieldTypeResolverService) =>
  (type: string, isReadonly: boolean = false): string => service?.resolveFieldType(type, isReadonly) ?? type;

@Injectable({
    providedIn: 'root'
})
export class FieldTypeResolverService {
  constructor(@Optional() @Inject(ENIGMATRY_FORM_CONFIG) private _formConfig: FormConfig) {
  }

  get resolverConfig(): FieldTypeResolverConfig {
    return this._formConfig?.fieldTypesConfig || {};
  }

  get readonlyFieldTypeMappings(): FieldTypeMappings {
    return this.resolverConfig.readonlyFieldTypeMappings || {};
  }

  get fieldTypeMappings(): FieldTypeMappings {
    return this.resolverConfig.fieldTypeMappings || {};
  }

  resolveFieldType(type: string, isReadonly: boolean = false): string {
    if (isReadonly) {
      return this.readonlyFieldTypeMappings[type]
        ?? `${this.resolverConfig.readonlyDefaultPrefix || ''}${type}`;
    }
    return this.fieldTypeMappings[type] ?? type;
  }
}
