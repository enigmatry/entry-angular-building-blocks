/* eslint-disable max-lines */
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component, ChangeDetectionStrategy, TemplateRef, ElementRef, inject, input, output, computed,
  linkedSignal,
  effect,
  signal
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ColumnDefinition, PagedData, RowSelectionFormatter, RowClassFormatter, ContextMenuItem,
  RowContextMenuFormatter, CellTemplate, ENTRY_TABLE_CONFIGURATION, EntryTableConfiguration
} from '../../interfaces';
import { EntryCellComponent } from '../entry-cell/entry-cell.component';
import { EntryCellContextMenuComponent } from '../entry-cell-context-menu/entry-cell-context-menu.component';

@Component({
  selector: 'entry-table',
  host: { class: 'entry-table' },
  imports: [MatTableModule, MatSortModule, MatCheckboxModule, MatRadioModule, MatPaginatorModule, EntryCellComponent, EntryCellContextMenuComponent],
  templateUrl: './entry-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryTableComponent<T> {
  private readonly configuration: EntryTableConfiguration = inject(ENTRY_TABLE_CONFIGURATION);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  dataSource = new MatTableDataSource<T>([]);
  readonly selectionColumn = 'selection-column';
  readonly contextMenuColumn = 'context-menu-column';

  readonly columns = input<ColumnDefinition[]>([]);
  readonly displayedColumns = computed<string[]>(() => {
    const result = this.columns().filter(item => !item.hide)
      .map(item => item.field);

    if (this.rowSelectable() && !result.includes(this.selectionColumn)) {
      result.unshift(this.selectionColumn);
    }

    if (this.showContextMenu() && !result.includes(this.contextMenuColumn)) {
      result.push(this.contextMenuColumn);
    }

    return result;
  });

  // Data
  readonly data = input<T[] | PagedData<T> | null | undefined>([]);
  private readonly trueData = signal(<T[] | null>([]));
  readonly total = linkedSignal<number>(() => 0);
  readonly loading = input<boolean>(false);

  // Pagination
  readonly showPaginator = input<boolean>(this.configuration.showPaginator);
  readonly pageDisabled = input<boolean>(this.configuration.showFirstLastButtons);
  readonly showFirstLastButtons = input<boolean>(false);
  readonly pageIndex = linkedSignal<number>(() => 0);
  readonly pageSize = linkedSignal<number>(() => 0);
  readonly pageSizeOptions = input<number[]>(this.configuration.pageSizeOptions);
  readonly hidePageSize = input<boolean>(this.configuration.hidePageSize);
  readonly paginationTemplate = input<TemplateRef<unknown>>();
  readonly shouldShowPaginator = computed(() => {
    return this.showPaginator() && this.trueData()?.length;
  });

  readonly pageChange = output<PageEvent>();

  // Sort
  readonly sortActive = input<string>();
  readonly sortDirection = input<SortDirection>();
  readonly sortDisableClear = input<boolean>(false);
  readonly sortDisabled = input<boolean>(false);
  readonly sortStart = input<'asc' | 'desc'>('asc');
  readonly sortChange = output<Sort>();

  // Row
  readonly rowHover = input<boolean>(false);
  readonly rowStriped = input<boolean>(false);
  readonly rowFocusVisible = input<boolean>(this.configuration.rowFocusVisible);
  readonly rowClick = output<T>();

  // Row selection
  readonly multiSelectable = input<boolean>(true);
  readonly rowSelection = linkedSignal(() => this.rowSelectable() ?
    new SelectionModel<T>(this.multiSelectable(), this.rowSelected()) : new SelectionModel<T>(true, []));

  readonly rowSelected = input<T[]>([]);
  readonly rowSelectable = input<boolean>(false);
  readonly showSelectAllCheckbox = input<boolean>(true);
  readonly rowSelectionFormatter = input<RowSelectionFormatter>({});
  readonly rowClassFormatter = input<RowClassFormatter>();

  // Context menu
  readonly showContextMenu = input<boolean>(false);
  readonly contextMenuItems = input<ContextMenuItem[]>([]);
  readonly contextMenuTemplate = input<TemplateRef<unknown> | null>(null);
  readonly rowContextMenuFormatter = input<RowContextMenuFormatter>();
  readonly contextMenuItemSelected = output<{ itemId: string; rowData: T }>();

  // No Result
  readonly noResultText = input<string>(this.configuration.noResultsText);
  readonly noResultTemplate = input<TemplateRef<unknown> | null>(null);
  readonly hasNoResult = computed(() => !this.trueData()?.length && !this.loading());

  readonly headerTemplate = input<TemplateRef<unknown> | CellTemplate | Record<string, TemplateRef<unknown>>>();
  readonly unknownTemplateAsTemplate = (template: unknown) => template as TemplateRef<unknown>;
  readonly cellTemplate = input<TemplateRef<unknown> | CellTemplate | Record<string, TemplateRef<unknown>>>();

  constructor() {
    effect(() => {
      if (this.data()) {
        let trueData: T[];
        if (Array.isArray(this.data())) {
          trueData = this.data() as T[];
        } else {
          const page = this.data() as PagedData<T>;
          this.total.set(page.totalCount ?? 0);
          this.pageSize.set(page.pageSize ?? this.pageSize() ?? this.configuration.pageSize);
          this.pageIndex.set(page.pageNumber ? page.pageNumber - 1 : this.pageIndex());
          trueData = (this.data() as PagedData<T>)?.items ?? [];
        }

        if (this.dataSource) {
          this.dataSource.disconnect();
        }

        this.dataSource = new MatTableDataSource(trueData);
        this.trueData.set(trueData);
        this.scrollToTop();
      }
    });
  }

  readonly toTemplateIndex = (template: TemplateRef<unknown> | CellTemplate | Record<string, TemplateRef<unknown>>, key: string) =>
    (template as unknown as Record<string, TemplateRef<unknown>>)[key];

  protected readonly isTemplateRef = (value: unknown) => value instanceof TemplateRef;

  readonly getRowClassList = (rowData: T, index: number) => {
    const classList = {
      selected: this.rowSelection().isSelected(rowData),
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      'mat-row-odd': index % 2
    } as Record<string, unknown>;

    const rowFormatter = this.rowClassFormatter();

    if (rowFormatter) {
      Object.keys(rowFormatter).forEach(key => {
        classList[key] = rowFormatter[key](rowData);
      });
    }

    return classList;
  };

  readonly getColumnClassList = (columnDefinition: ColumnDefinition): string => {
    const customClasses = columnDefinition.class ?? '';
    const columnType = columnDefinition.type ?? '';
    const columnField = `cell-${this.convertToKebabCase(columnDefinition.field)}`;

    return `${customClasses} ${columnType} ${columnField}`;
  };

  readonly getIndex = (index: number, dataIndex: number) => typeof index === 'undefined' ? dataIndex : index;

  readonly allRowsSelected = (): boolean => {
    const selectedCount = this.rowSelection().selected.length;
    const rowCount = this.dataSource.data.filter(row => !this.rowSelectionFormatter().disabled?.(row)).length;
    return selectedCount === rowCount;
  };

  readonly toggleSelectAllCheckbox = (): void => {
    if (this.allRowsSelected()) {
      this.rowSelection().clear();
    } else {
      this.dataSource.data.forEach(row => {
        if (!this.rowSelectionFormatter().disabled?.(row)) {
          this.rowSelection().select(row);
        }
      });
    }
    this.rowSelection.set(this.rowSelection());
  };

  readonly toggleRowSelection = (row: T) => {
    this.rowSelection().toggle(row);
    this.rowSelection.set(this.rowSelection());
  };

  readonly handlePage = (event: PageEvent) => {
    this.pageChange.emit(event);
  };

  readonly scrollToTop = (): void => {
    this.elementRef.nativeElement.scrollTop = 0;
  };

  readonly convertToKebabCase = (value: string): string => value?.replace(/([a-z0-9])([A-Z])/gu, '$1-$2').toLowerCase();
}
