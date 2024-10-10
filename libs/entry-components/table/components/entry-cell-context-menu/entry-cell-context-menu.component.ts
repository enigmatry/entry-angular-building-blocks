import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RowContextMenuFormatter } from '../../interfaces/row-context-menu-formatter';
import { ContextMenuItem } from '../../interfaces/context-menu-item';

@Component({
  selector: 'entry-cell-context-menu',
  templateUrl: './entry-cell-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryCellContextMenuComponent implements OnInit {

  @Input() items: ContextMenuItem[] = [];
  @Input() rowMenuFormatter: RowContextMenuFormatter;
  @Input() rowData: any;
  @Input() icon: string = 'more_vert';
  @Input() subMenuIcon: string = 'keyboard_arrow_right';
  @Output() selected = new EventEmitter<string>();

  menuItems: ContextMenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = this.rowMenuFormatter?.items
      ? this.rowMenuFormatter.items(this.rowData)
      : this.items;
  }

  hasItems = (menuItem: ContextMenuItem) : boolean => menuItem.items?.length > 0;

  subMenuSelected = (item: string) => this.selected.emit(item);
}
