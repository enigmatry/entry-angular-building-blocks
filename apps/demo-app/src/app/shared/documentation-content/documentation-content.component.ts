import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { COMPONENT_DEFINITIONS, IComponentDefinition } from '../../features/component-definitions';

@Component({
  selector: 'app-documentation-content',
  templateUrl: './documentation-content.component.html',
  styleUrls: ['./documentation-content.component.scss'],
  standalone: false
})
export class DocumentationContentComponent {
  readonly componentDefinition: IComponentDefinition | undefined =
    COMPONENT_DEFINITIONS.find(c => inject(Router).url.includes(c.route));
}
