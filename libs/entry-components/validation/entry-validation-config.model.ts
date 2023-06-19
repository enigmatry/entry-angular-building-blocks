import { InjectionToken } from '@angular/core';

/** Validation message configuration */
export interface IEntryValidationMessage {
    // Validation key
    name: string;
    // Validation message. Can be resolved dynamically (e.g. when it needs to be translated).
    message: string | (() => string);
}

/**
 * Used to provide default configurations on module level.
 */
export class EntryValidationConfig {
    /** Validation key to message configuration on module level. */
    validationMessages: IEntryValidationMessage[];

    constructor(config: Partial<EntryValidationConfig> = {}) {
        this.validationMessages = config.validationMessages ?? [];
    }
}

/**
 * Entry validation injection token of EntryValidationConfig type containing validation default configurations.
 * Can be updated with custom configuration.
 *
 * Defaults:
 * - validationMessages: []
 */
export const ENTRY_VALIDATION_CONFIG = new InjectionToken<EntryValidationConfig>(
    'EntryValidationConfig',
    {
        providedIn: 'root',
        factory: () => new EntryValidationConfig()
    }
);
