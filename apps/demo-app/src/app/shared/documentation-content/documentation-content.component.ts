import { Component, Input } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';

@Component({
  selector: 'app-documentation-content',
  templateUrl: './documentation-content.component.html',
  styleUrls: ['./documentation-content.component.scss']
})
export class DocumentationContentComponent {
  @Input() componentDefinition: IComponentDefinition;
}
