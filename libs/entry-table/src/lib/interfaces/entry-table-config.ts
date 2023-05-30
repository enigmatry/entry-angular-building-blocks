import { InjectionToken } from '@angular/core';

export class EntryTableConfig {
  public showPaginator = true;
  public showFirstLastButtons = false;
  public pageSize = 20;
  public pageSizeOptions = [20, 50, 100];
  public hidePageSize = false;
  public noResultsText = 'No results found';
};

export const ENTRY_TABLE_CONFIG = new InjectionToken<EntryTableConfig>(
  'ENTRY_TABLE_CONFIG',
  {
    providedIn: 'root',
    factory: () => new EntryTableConfig()
  });


export const DEFAULT_DATE_FORMAT: InjectionToken<string> = new InjectionToken<string>('');
export const DEFAULT_TIMEZONE: InjectionToken<string> = new InjectionToken<string>('');
export const DEFAULT_PERCENTAGE_MULTIPLIER: InjectionToken<number> = new InjectionToken<number>('');
