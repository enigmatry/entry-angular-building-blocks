import { Provider } from '@angular/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components';
/**
 * Used to provide default configurations on module level.
 */
export class EntryDateTimePickerConfig {
    /** Shows seconds selector in date-time-picker pop-up (default undefined) */
    showSeconds: boolean | undefined;

    constructor(config: Partial<EntryDateTimePickerConfig> = {}) {
        this.showSeconds = config.showSeconds ?? undefined;
    }
}

/**
 * Entry date-time-picker injection token of EntryDateTimePickerConfig type containing dialog default configurations.
 *
 * Defaults:
 * - showSeconds: undefined
 */
export const ENTRY_DATE_TIME_PICKER_CONFIG = createInjectionToken(new EntryDateTimePickerConfig());

/**
 * Can be used to provide entry date-time-picker configuration.
 */
export function provideEntryDateTimePickerConfig(config: Partial<EntryDateTimePickerConfig>): Provider {
    return provideConfig(ENTRY_DATE_TIME_PICKER_CONFIG, () => new EntryDateTimePickerConfig(config));
}