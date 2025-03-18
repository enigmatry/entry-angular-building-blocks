import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { RowContextMenuFormatter } from '../../interfaces/row-context-menu-formatter';
import { ContextMenuItem } from '../../interfaces/context-menu-item';

@Component({
    selector: 'entry-cell-context-menu',
    templateUrl: './entry-cell-context-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EntryCellContextMenuComponent implements OnInit {

  @Input() items: ContextMenuItem[] = [];
  @Input() rowMenuFormatter: RowContextMenuFormatter;
  @Input() rowData: any;
  @Input() triggerIcon: string = 'more_vert';
  @Input() isSubMenu: boolean = false;
  @Output() selected = new EventEmitter<string>();

  @ViewChild('menu', { static: true }) menu: MatMenuPanel;

  menuItems: ContextMenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = this.rowMenuFormatter?.items
      ? this.rowMenuFormatter.items(this.rowData)
      : this.items;
  }
}
