/* eslint-disable @typescript-eslint/member-ordering */

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  OnChanges,
  TemplateRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  SimpleChanges,
  HostBinding,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';

import {
  ColumnDef,
  CellTemplate,
  RowSelectionFormatter,
  RowClassFormatter,
  ContextMenuItem,
  RowContextMenuFormatter,
} from './grid.interface';
import { PagedData } from '@enigmatry/angular-building-blocks/pagination';

@Component({
  selector: 'enigmatry-grid',
  exportAs: 'enigmatryGrid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnigmatryGridComponent<T> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @HostBinding('class') className = 'enigmatry-grid';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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

  @Input() showPaginator = true;
  @Input() pageDisabled = false;
  @Input() showFirstLastButtons = false;
  @Input() pageIndex = 0;
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [20, 50, 100];
  @Input() hidePageSize = false;
  @Input() pageDatasetLocally = false;
  @Output() pageChange = new EventEmitter<PageEvent>();

  @Input() paginationTemplate: TemplateRef<any>;

  // Sort

  @Input() sortActive: string;
  @Input() sortDirection: SortDirection;
  @Input() sortDisableClear = false;
  @Input() sortDisabled = false;
  @Input() sortStart: 'asc' | 'desc' = 'asc';
  @Input() sortDatasetLocally = false;
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
  @Input() hideRowSelectionCheckbox = false;
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

  @Input() noResultText = 'No results found';
  @Input() noResultTemplate: TemplateRef<any> | null;

  get hasNoResult() {
    return (!this.data || this._data.length === 0) && !this.loading;
  }

  @Input() headerTemplate: TemplateRef<any> | CellTemplate | any;

  @Input() cellTemplate: TemplateRef<any> | CellTemplate | any;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  detectChanges() {
    this._changeDetectorRef.detectChanges();
  }

  isTemplateRef(obj: any) {
    return obj instanceof TemplateRef;
  }

  getRowClassList(rowData: any, index: number) {
    const classList: any = {
      selected: this.rowSelection.isSelected(rowData),
      'mat-row-odd': index % 2,
    };
    if (this.rowClassFormatter) {
      for (const key of Object.keys(this.rowClassFormatter)) {
        classList[key] = this.rowClassFormatter[key](rowData);
      }
    }
    return classList;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    this.displayedColumns = this.columns.filter(item => !item.hide).map(item => item.field);

    if (this.rowSelectable && !this.hideRowSelectionCheckbox) {
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
      this.pageSize = this._page.pageSize ?? this.pageSize;
      this.pageIndex = this._page.pageNumber ? this._page.pageNumber - 1 : this.pageIndex;
    }

    if (this.dataSource) {
      this.dataSource.disconnect();
    }

    this.dataSource = new MatTableDataSource(this._data);

    this.dataSource.paginator = this.pageDatasetLocally ? this.paginator : null;
    this.dataSource.sort = this.sortDatasetLocally ? this.sort : null;

    // Only scroll top with data change
    if (changes.data) {
      this.scrollTop(0);
    }
  }

  ngAfterViewInit() {
    if (this.pageDatasetLocally) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sortDatasetLocally) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() { }

  getIndex(index: number, dataIndex: number) {
    return typeof index === 'undefined' ? dataIndex : index;
  }

  isAllSelected() {
    const numSelected = this.rowSelection.selected.length;
    const numRows = this.dataSource.data.filter(row => !this.rowSelectionFormatter.disabled?.(row)).length;
    return numSelected === numRows;
  }

  toggleMasterCheckbox(): void {
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

  toggleCheckbox(row: any) {
    this.rowSelection.toggle(row);
    this.rowSelectionChange.emit(this.rowSelection.selected);
  }

  handlePage(e: PageEvent) {
    if (this.pageDatasetLocally) {
      this.scrollTop(0);
    }
    this.pageChange.emit(e);
  }

  scrollTop(value?: number): number | void {
    if (value == null) {
      return this.tableContainer?.nativeElement.scrollTop;
    }
    if (this.tableContainer && !this.loading) {
      this.tableContainer.nativeElement.scrollTop = value;
    }
  }
}
