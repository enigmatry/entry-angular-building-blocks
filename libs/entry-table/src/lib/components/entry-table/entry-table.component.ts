/* eslint-disable @typescript-eslint/member-ordering */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  OnChanges,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef,
  SimpleChanges,
  HostBinding,
  Inject,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';

import {
  ColumnDef, PagedData, RowSelectionFormatter, RowClassFormatter,
  ContextMenuItem, RowContextMenuFormatter, CellTemplate, ENTRY_TABLE_CONFIG, EntryTableConfig
} from '../../interfaces';

@Component({
  selector: 'entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryTableComponent<T> implements OnChanges {

  @HostBinding('class') className = 'entry-table';
  @ViewChild('tableContainer') tableContainer: ElementRef<HTMLDivElement>;

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
  @Output() pageChange = new EventEmitter<PageEvent>();

  @Input() paginationTemplate: TemplateRef<any>;

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
  @Input() rowFocusVisible = false;
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

  get hasNoResult() {
    return (!this.data || this._data.length === 0) && !this.loading;
  }

  @Input() headerTemplate: TemplateRef<any> | CellTemplate | any;

  @Input() cellTemplate: TemplateRef<any> | CellTemplate | any;

  constructor(
    @Inject(ENTRY_TABLE_CONFIG) private _config: EntryTableConfig,
    private _changeDetectorRef: ChangeDetectorRef) { }

  detectChanges() {
    this._changeDetectorRef.detectChanges();
  }

  isTemplateRef(obj: any) {
    return obj instanceof TemplateRef;
  }

  getRowClassList(rowData: T, index: number) {
    const classList = {
      selected: this.rowSelection.isSelected(rowData),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'mat-row-odd': index % 2,
    };
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
    this.showPaginator = this.showPaginator ?? this._config.showPaginator;
    this.showFirstLastButtons = this.showFirstLastButtons ?? this._config.showFirstLastButtons;
    this.pageSizeOptions = this.pageSizeOptions ?? this._config.pageSizeOptions;
    this.hidePageSize = this.hidePageSize ?? this._config.hidePageSize;
    this.noResultText = this.noResultText ?? this._config.noResultsText;

    this.displayedColumns = this.columns.filter(item => !item.hide).map(item => item.field);

    if (this.rowSelectable && !this.displayedColumns.includes('CheckboxColumnDef')) {
      this.displayedColumns.unshift('CheckboxColumnDef');
    }

    if (this.showContextMenu && !this.displayedColumns.includes('ContextMenuColumnDef')) {
      this.displayedColumns.push('ContextMenuColumnDef');
    }

    if (this.rowSelectable) {
      this.rowSelection = new SelectionModel<T>(this.multiSelectable, this.rowSelected);
    }

    if (!this.data) {
      this.data = [];
    }

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

    if (changes.data) {
      this.scrollTop(0);
    }
  }

  getIndex(index: number, dataIndex: number) {
    return typeof index === 'undefined' ? dataIndex : index;
  }

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

  scrollTop(value?: number): void {
    if (value != null && this.tableContainer && !this.loading) {
      this.tableContainer.nativeElement.scrollTop = value;
    }
  }

  private convertToKebabCase(value: string): string {
    return value?.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
