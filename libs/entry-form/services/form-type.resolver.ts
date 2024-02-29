import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ENTRY_FORM_CONFIG, EntryFormConfig, FieldTypeResolverConfig, FieldTypeMappings } from '../interfaces/form-config';

export declare type FieldTypeResolver = (type: string, isReadonly: boolean) => string;

export const ENTRY_FIELD_TYPE_RESOLVER = new InjectionToken<FieldTypeResolver>('ENTRY_FIELD_TYPE_RESOLVER');

export const fieldTypeResolverFactory = (service: FieldTypeResolverService) =>
  (type: string, isReadonly = false): string => service?.resolveFieldType(type, isReadonly) ?? type;

@Injectable({
  providedIn: 'root'
})
export class FieldTypeResolverService {
  constructor(@Optional() @Inject(ENTRY_FORM_CONFIG) private _formConfig: EntryFormConfig) {
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

  resolveFieldType(type: string, isReadonly = false): string {
    if (isReadonly) {
      return this.readonlyFieldTypeMappings[type]
        ?? `${this.resolverConfig.readonlyDefaultPrefix || ''}${type}`;
    }
    return this.fieldTypeMappings[type] ?? type;
  }
}
