import { Component } from '@angular/core';
import { ICodeFileDefinition } from '../../shared/example-viewer/code-file-definition.interface';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  extraFiles: ICodeFileDefinition[] = [
    {
      name: 'users.service.ts',
      path: 'search-filter\\search-filter\\users.service',
      type: 'ts'
    }
  ];
}
