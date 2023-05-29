import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';
import { COMPONENT_DEFINITIONS } from '../../shared/models/component-definitions';
import { RouteSegments } from '../../shared/models/route-segments';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  searchFilterComponentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === RouteSegments.searchFilter);
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'users.service.ts',
      path: 'search-filter\\search-filter\\users.service',
      type: 'ts'
    }
  ];
}
