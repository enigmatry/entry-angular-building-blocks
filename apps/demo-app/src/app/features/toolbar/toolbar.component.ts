import { Component } from '@angular/core';
import { COMPONENT_DEFINITIONS } from '../../shared/models/component-definitions';
import { RouteSegments } from '../../shared/models/route-segments';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  componentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === RouteSegments.toolbar);
}
