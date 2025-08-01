/* eslint-disable max-lines */
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef,
  SimpleChanges,
  HostBinding,
  inject
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  ColumnDef, PagedData, RowSelectionFormatter, RowClassFormatter,
  ContextMenuItem, RowContextMenuFormatter, CellTemplate, ENTRY_TABLE_CONFIG, EntryTableConfig
} from '../../interfaces';

@Component({
  selector: 'entry-table',
  templateUrl: './entry-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EntryTableComponent<T> implements OnChanges {
  @HostBinding('class') className = 'entry-table';

  private readonly _config: EntryTableConfig = inject(ENTRY_TABLE_CONFIG);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  dataSource = new MatTableDataSource<T>([]);

  @Input() displayedColumns: string[];
  @Input() columns: ColumnDef[] = [];

  // Data
  private _data: T[] = [];
  private _page: PagedData<T>;
  @Input() data: T[] | PagedData<T> | null | undefined = [];
  @Input() total = 0;
  @Input() loading = false;

  // Pagination
  @Input() showPaginator: boolean;
  @Input() pageDisabled = false;
  @Input() showFirstLastButtons: boolean;
  @Input() pageIndex = 0;
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() hidePageSize: boolean;
  @Input() paginationTemplate: TemplateRef<any>;
  @Output() pageChange = new EventEmitter<PageEvent>();

  // Sort
  @Input() sortActive: string;
  @Input() sortDirection: SortDirection;
  @Input() sortDisableClear = false;
  @Input() sortDisabled = false;
  @Input() sortStart: 'asc' | 'desc' = 'asc';
  @Output() sortChange = new EventEmitter<Sort>();

  // Row
  @Input() rowHover = false;
  @Input() rowStriped = false;
  @Input() rowFocusVisible: boolean;
  @Output() rowClick = new EventEmitter<T>();

  // Row selection
  @Input() multiSelectable = true;
  rowSelection: SelectionModel<T> = new SelectionModel<T>(true, []);

  @Input() rowSelected: T[] = [];
  @Input() rowSelectable = false;
  @Input() showSelectAllCheckbox = true;
  @Input() rowSelectionFormatter: RowSelectionFormatter = {};
  @Input() rowClassFormatter: RowClassFormatter;
  @Output() rowSelectionChange = new EventEmitter<T[]>();

  // Context menu
  @Input() showContextMenu = false;
  @Input() contextMenuItems: ContextMenuItem[] = [];
  @Input() contextMenuTemplate: TemplateRef<any> | null;
  @Input() rowContextMenuFormatter: RowContextMenuFormatter;
  @Output() contextMenuItemSelected = new EventEmitter<{ itemId: string; rowData: T }>();

  // No Result
  @Input() noResultText: string;
  @Input() noResultTemplate: TemplateRef<any> | null;

  readonly selectionColumn = 'selection-column';
  readonly contextMenuColumn = 'context-menu-column';

  get hasNoResult() {
    return (!this.data || this._data.length === 0) && !this.loading;
  }

  @Input() headerTemplate: TemplateRef<unknown> | CellTemplate | Record<string, TemplateRef<unknown>>;
  @Input() cellTemplate: TemplateRef<unknown> | CellTemplate | Record<string, TemplateRef<unknown>>;

  readonly toTemplateIndex = (template: TemplateRef<unknown> | CellTemplate | Record<string, TemplateRef<unknown>>, key: string) =>
    (template as unknown as Record<string, TemplateRef<unknown>>)[key];

  detectChanges() {
    this._changeDetectorRef.detectChanges();
  }

  isTemplateRef = (obj: any) => obj instanceof TemplateRef;

  getRowClassList(rowData: T, index: number) {
    const classList = {
      selected: this.rowSelection.isSelected(rowData),

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      'mat-row-odd': index % 2
    } as Record<string, unknown>;
    if (this.rowClassFormatter) {
      for (const key of Object.keys(this.rowClassFormatter)) {
        classList[key] = this.rowClassFormatter[key](rowData);
      }
    }
    return classList;
  }

  getColumnClassList(colDef: ColumnDef): string {
    const customClasses = colDef.class ?? '';
    const columnType = colDef.type ?? '';
    const columnField = `cell-${this.convertToKebabCase(colDef.field)}`;

    return `${customClasses} ${columnType} ${columnField}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initializeVariables();

    if (Array.isArray(this.data)) {
      this._data = this.data as T[];
    } else {
      this._page = this.data as PagedData<T>;
      this._data = this._page.items ?? [];
      this.total = this._page.totalCount ?? 0;
      this.pageSize = this._page.pageSize ?? this.pageSize ?? this._config.pageSize;
      this.pageIndex = this._page.pageNumber ? this._page.pageNumber - 1 : this.pageIndex;
    }

    if (this.dataSource) {
      this.dataSource.disconnect();
    }

    this.dataSource = new MatTableDataSource(this._data);

    if (changes['data']) {
      this.scrollToTop();
    }
  }

  getIndex = (index: number, dataIndex: number) => typeof index === 'undefined' ? dataIndex : index;

  private readonly initializeVariables = () => {
    this.showPaginator = this.showPaginator ?? this._config.showPaginator;
    this.showFirstLastButtons = this.showFirstLastButtons ?? this._config.showFirstLastButtons;
    this.pageSizeOptions = this.pageSizeOptions ?? this._config.pageSizeOptions;
    this.hidePageSize = this.hidePageSize ?? this._config.hidePageSize;
    this.noResultText = this.noResultText ?? this._config.noResultsText;
    this.rowFocusVisible = this.rowFocusVisible ?? this._config.rowFocusVisible;

    this.displayedColumns = this.columns.filter(item => !item.hide).map(item => item.field);

    if (this.rowSelectable && !this.displayedColumns.includes(this.selectionColumn)) {
      this.displayedColumns.unshift(this.selectionColumn);
    }

    if (this.showContextMenu && !this.displayedColumns.includes(this.contextMenuColumn)) {
      this.displayedColumns.push(this.contextMenuColumn);
    }

    if (this.rowSelectable) {
      this.rowSelection = new SelectionModel<T>(this.multiSelectable, this.rowSelected);
    }

    if (!this.data) {
      this.data = [];
    }
  };

  isAllSelected() {
    const numSelected = this.rowSelection.selected.length;
    const numRows = this.dataSource.data.filter(row => !this.rowSelectionFormatter.disabled?.(row)).length;
    return numSelected === numRows;
  }

  toggleSelectAllCheckbox(): void {
    if (this.isAllSelected()) {
      this.rowSelection.clear();
      this.rowSelectionChange.emit(this.rowSelection.selected);
      return;
    }
    this.dataSource.data.forEach(row => {
      if (!this.rowSelectionFormatter.disabled?.(row)) {
        this.rowSelection.select(row);
      }
    });
    this.rowSelectionChange.emit(this.rowSelection.selected);
  }

  toggleRowSelection(row: any) {
    this.rowSelection.toggle(row);
    this.rowSelectionChange.emit(this.rowSelection.selected);
  }

  handlePage(e: PageEvent) {
    this.pageChange.emit(e);
  }

  scrollToTop(): void {
    this._elementRef.nativeElement.scrollTop = 0;
  }

  get shouldShowPaginator() {
    return this.showPaginator && this._data.length > 0;
  }

  convertToKebabCase = (value: string): string => value?.replace(/([a-z0-9])([A-Z])/gu, '$1-$2').toLowerCase();
}
