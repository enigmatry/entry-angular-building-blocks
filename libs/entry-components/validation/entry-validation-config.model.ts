import { Provider } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';

/** Used to configure mapping between validation keys and messages */
export interface IEntryValidationMessage {
    /** Validation key (e.g. '_required_', '_minlength_', '_email_', etc.) */
    name: string;
    /**
     * Validation message. Can be static string or expression returning string
     *  (when messages need to be resolved dynamically: parametrization, localization, etc.).
     */
    message: string | ((control: AbstractControl) => string);
}

/**
 * Used to provide default configurations on module level.
 */
export class EntryValidationConfig {
    /**
     * Validation key to message configuration on module level. Used to configure client side validation messages
     * for standard validators (_required_, _minLength_, _email_, etc.).
     *
     * **NOTE:** If using _Formly_ package to render forms, this configuration should not be used.
     * Instead, use `FormlyModule` to configure validation messages.
     *
     * @example
     * ```ts
     * new EntryValidationConfig() {
     *   validationMessages: [
     *     { name: 'required': message: 'This field is mandatory' },
     *     { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}`}
     *   ]
     * }
     * ```
     */
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
export const ENTRY_VALIDATION_CONFIG = createInjectionToken(new EntryValidationConfig());

/**
 * Can be used to provide entry validation configuration.
 */
export function provideEntryValidationConfig(config: Partial<EntryValidationConfig>): Provider {
    return provideConfig(ENTRY_VALIDATION_CONFIG, () => new EntryValidationConfig(config));
}
