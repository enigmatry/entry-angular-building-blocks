import { Provider } from '@angular/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';

/**
 * Used to provide entry search filter configuration on module level.
 */
export class EntrySearchFilterConfig {
    /** Apply search filters button label (default 'Apply') */
    applyButtonText: string;
    /** Clear search filters button label (default 'Clear') */
    clearButtonText: string;
    /** Label for 'none selected' select filter option */
    noneSelectedOptionText: string;
    /** Message shown under a required filter left empty (default 'This filter is required') */
    requiredMessage: string;
    /** Message shown when a filter's value is longer than its maximum (default 'Value is too long') */
    maxLengthMessage: string;

    constructor(config: Partial<EntrySearchFilterConfig> = {}) {
        this.applyButtonText = config.applyButtonText ?? 'Apply';
        this.clearButtonText = config.clearButtonText ?? 'Clear';
        this.noneSelectedOptionText = config.noneSelectedOptionText ?? 'None';
        this.requiredMessage = config.requiredMessage ?? 'This filter is required';
        this.maxLengthMessage = config.maxLengthMessage ?? 'Value is too long';
    }
}
export const ENTRY_SEARCH_FILTER_CONFIG = createInjectionToken(new EntrySearchFilterConfig());

/**
 * Can be used to provide entry search filter configuration.
 */
export const provideEntrySearchFilterConfig = (config: Partial<EntrySearchFilterConfig>): Provider =>
    provideConfig(ENTRY_SEARCH_FILTER_CONFIG, () => new EntrySearchFilterConfig(config));
