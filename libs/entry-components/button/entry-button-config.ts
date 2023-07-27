import { InjectionToken } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

/** Possible mat button variants */
export declare type MatButtonVariants = 'basic' | 'flat' | 'raised' | 'stroked';

//** MatButtonConfig containing type and color */
export interface MatButtonConfig {
  type: MatButtonVariants;
  color?: ThemePalette;
}

/**
 * Used to provide button configuration on module or application level.
 */
export class EntryButtonConfig {
  /** Submit button configuration */
  submitButton: MatButtonConfig;
  /** Cancel button configuration */
  cancelButton: MatButtonConfig;

  constructor(config: Partial<EntryButtonConfig> = {}) {
    this.submitButton = config.submitButton ?? { type: 'flat', color: 'primary' };
    this.cancelButton = config.cancelButton ?? { type: 'basic' };
  }
}

/**
 * Entry button config injection token. Can be used to provide custom button configuration.
 *
 * Defaults:
 * - submitButton: type: 'flat', color: 'primary'
 * - cancelButton: type: 'basic'
 */
export const ENTRY_BUTTON_CONFIG = new InjectionToken<EntryButtonConfig>('EntryButtonConfig',
  {
    providedIn: 'root',
    factory: () => new EntryButtonConfig()
  }
);
