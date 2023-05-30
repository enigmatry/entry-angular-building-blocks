import { InjectionToken } from '@angular/core';

/**
 * Used to provide default configurations on module level.
 */
export class EntrySearchFilterConfig {
    /** Apply search filters button label (default 'Apply') */
    applyButtonText: string;

    constructor(config: Partial<EntrySearchFilterConfig> = {}) {
        this.applyButtonText = config.applyButtonText ?? 'Apply';
    }
}
export const ENTRY_SEARCH_FILTER_CONFIG = new InjectionToken<EntrySearchFilterConfig>('EntrySearchFilterConfig',
    {
        providedIn: 'root',
        factory: () => new EntrySearchFilterConfig()
    }
);
