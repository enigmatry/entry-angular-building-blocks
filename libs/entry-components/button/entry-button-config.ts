import { Provider } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';

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
  submit: MatButtonConfig;
  /** Cancel button configuration */
  cancel: MatButtonConfig;

  constructor(config: Partial<EntryButtonConfig> = {}) {
    this.submit = config.submit ?? { type: 'flat', color: 'primary' };
    this.cancel = config.cancel ?? { type: 'basic', color: 'accent' };
  }
}

/**
 * Entry button config injection token.
 *
 * Defaults:
 * - submit: type: 'flat', color: 'primary'
 * - cancel: type: 'basic', color: 'accent'
 */
export const ENTRY_BUTTON_CONFIG = createInjectionToken(new EntryButtonConfig());

/**
 * Can be used to provide custom button configuration.
 */
export const provideEntryButtonConfig = (config: Partial<EntryButtonConfig>): Provider =>
  provideConfig(ENTRY_BUTTON_CONFIG, () => new EntryButtonConfig(config));
