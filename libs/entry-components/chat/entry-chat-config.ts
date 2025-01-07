import { Provider } from '@angular/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';


/**
 * Used to provide chat configuration on module or application level.
 */
export class EntryChatConfig {

  constructor(_config: Partial<EntryChatConfig> = {}) {}
}

/**
 * Entry chat config injection token.
 *
 * Defaults:
 */
export const ENTRY_CHAT_CONFIG = createInjectionToken(new EntryChatConfig());

/**
 * Can be used to provide chat configuration.
 */
export function provideEntryChatConfig(config: Partial<EntryChatConfig>): Provider {
  return provideConfig(ENTRY_CHAT_CONFIG, () => new EntryChatConfig(config));
}
