import { InjectionToken } from '@angular/core';

export class GridConfig {
  public showPaginator = true;
  public showFirstLastButtons = false;
  public pageSize = 20;
  public pageSizeOptions = [20, 50, 100];
  public hidePageSize = false;
  public noResultsText = 'No results found';
};

const defaultEnigmatryGridConfig = new GridConfig();

export const ENIGMATRY_GRID_CONFIG = new InjectionToken<GridConfig>(
  'ENIGMATRY_GRID_CONFIG',
  {
    providedIn: 'root',
    factory: () => defaultEnigmatryGridConfig
  });
