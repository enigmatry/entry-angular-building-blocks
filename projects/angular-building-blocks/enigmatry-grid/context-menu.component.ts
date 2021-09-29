import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ContextMenuItem, RowContextMenuFormatter } from './grid.interface';

@Component({
    selector: 'enigmatry-grid-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnigmatryGridContextMenuComponent implements OnInit {
    @Input() items: ContextMenuItem[] = [];
    @Input() rowMenuFormatter: RowContextMenuFormatter;
    @Input() rowData: any;
    @Output() selected = new EventEmitter<string>();

    menuItems: ContextMenuItem[] = [];

    constructor() { }

    ngOnInit(): void {
        if (this.rowMenuFormatter.items) {
            this.menuItems = this.rowMenuFormatter.items(this.rowData);
        } else {
            this.menuItems = this.items;
        }
    }
}
