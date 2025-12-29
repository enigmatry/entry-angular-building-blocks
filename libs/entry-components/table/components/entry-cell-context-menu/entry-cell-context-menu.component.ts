import { ChangeDetectionStrategy, Component, computed, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { ContextMenuItem } from '../../interfaces/context-menu-item';
import { RowContextMenuFormatter } from '../../interfaces/row-context-menu-formatter';

@Component({
  selector: 'entry-cell-context-menu',
  imports: [MatMenuModule, MatButtonModule, MatIconModule, EntryCellContextMenuComponent],
  templateUrl: './entry-cell-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryCellContextMenuComponent {
  readonly items = input.required<ContextMenuItem[]>();
  readonly rowMenuFormatter = input<RowContextMenuFormatter>();
  readonly rowData = input<unknown>();
  readonly triggerIcon = input<string>('more_vert');
  readonly isSubMenu = input<boolean>(false);
  readonly selected = output<string>();
  readonly menuItems = computed(() => (this.rowMenuFormatter()?.items
    ? this.rowMenuFormatter()?.items(this.rowData)
    : this.items()) ?? []);
  readonly menu = viewChild<MatMenuPanel>('menu');
  readonly subMenu = viewChild<EntryCellContextMenuComponent>('subMenu');
}
