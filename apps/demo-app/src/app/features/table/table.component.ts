import { Component } from '@angular/core';
import { COMPONENT_DEFINITIONS } from '../../shared/models/component-definitions';
import { RouteSegments } from '../../shared/models/route-segments';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  tableComponentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === RouteSegments.table);
}
