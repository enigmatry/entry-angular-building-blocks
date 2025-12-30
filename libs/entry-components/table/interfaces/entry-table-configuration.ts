import { InjectionToken, Provider } from '@angular/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';

export class EntryTableConfiguration {
  /** Show paginator, default is true */
  showPaginator = true;
  /** Show first and last pagination buttons, default is false */
  showFirstLastButtons = false;
  /** Page size, default 20 */
  pageSize = 20;
  /** Page size options, default [20, 50, 100] */
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  pageSizeOptions = [20, 50, 100];
  /** Hide page size options, default is false */
  hidePageSize = false;
  /** Hide pagination, default is false */
  noResultsText = 'No results found';
  /** Row focus visible, default is false */
  rowFocusVisible = false;

  constructor(config: Partial<EntryTableConfiguration> = {}) {
    this.showPaginator = config.showPaginator ?? this.showPaginator;
    this.showFirstLastButtons = config.showFirstLastButtons ?? this.showFirstLastButtons;
    this.pageSize = config.pageSize ?? this.pageSize;
    this.pageSizeOptions = config.pageSizeOptions ?? this.pageSizeOptions;
    this.hidePageSize = config.hidePageSize ?? this.hidePageSize;
    this.noResultsText = config.noResultsText ?? this.noResultsText;
    this.rowFocusVisible = config.rowFocusVisible ?? this.rowFocusVisible;
  }
}

/** Entry table config injection token
 * Defaults:
 * - showPaginator: true
 * - showFirstLastButtons: false
 * - pageSize: 20
 * - pageSizeOptions: [20, 50, 100]
 * - hidePageSize: false
 * - noResultsText: 'No results found'
 * - rowFocusVisible: false
 */
export const ENTRY_TABLE_CONFIGURATION = createInjectionToken(new EntryTableConfiguration());

/** Provide entry table config */
export const provideEntryTableConfiguration = (config: Partial<EntryTableConfiguration>): Provider =>
  provideConfig(ENTRY_TABLE_CONFIGURATION, () => new EntryTableConfiguration(config));

/** Default percentage multiplier injection token */
export const DEFAULT_PERCENTAGE_MULTIPLIER: InjectionToken<number> = new InjectionToken<number>('');
