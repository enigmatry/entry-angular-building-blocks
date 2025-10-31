import { Provider } from '@angular/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';

/**
 * Used to provide entry search filter configuration on module level.
 */
export class EntrySearchFilterConfig {
    /** Apply search filters button label (default 'Apply') */
    applyButtonText: string;
    /** Label for 'none selected' select filter option */
    noneSelectedOptionText: string;

    constructor(config: Partial<EntrySearchFilterConfig> = {}) {
        this.applyButtonText = config.applyButtonText ?? 'Apply';
        this.noneSelectedOptionText = config.noneSelectedOptionText ?? 'None';
    }
}
export const ENTRY_SEARCH_FILTER_CONFIG = createInjectionToken(new EntrySearchFilterConfig());

/**
 * Can be used to provide entry search filter configuration.
 */
export const provideEntrySearchFilterConfig = (config: Partial<EntrySearchFilterConfig>): Provider =>
    provideConfig(ENTRY_SEARCH_FILTER_CONFIG, () => new EntrySearchFilterConfig(config));
