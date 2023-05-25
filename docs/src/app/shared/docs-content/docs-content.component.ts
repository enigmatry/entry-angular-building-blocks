import { Component, Input } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';

@Component({
  selector: 'app-docs-content',
  templateUrl: './docs-content.component.html',
  styleUrls: ['./docs-content.component.scss']
})
export class DocsContentComponent {
  @Input() componentDefinition: IComponentDefinition;
}
