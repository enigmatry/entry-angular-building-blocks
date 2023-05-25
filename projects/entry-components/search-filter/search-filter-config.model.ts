import { InjectionToken } from '@angular/core';

export class EntrySearchFilterConfig {
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
