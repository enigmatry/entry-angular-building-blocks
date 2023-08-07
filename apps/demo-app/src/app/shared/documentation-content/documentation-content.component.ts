import { Component, Input } from '@angular/core';
import { COMPONENT_DEFINITIONS, IComponentDefinition } from '../../features/component-definitions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documentation-content',
  templateUrl: './documentation-content.component.html',
  styleUrls: ['./documentation-content.component.scss']
})
export class DocumentationContentComponent {
  componentDefinition: IComponentDefinition;

  constructor(activatedRoute: ActivatedRoute) {
    const componentRoute = activatedRoute.snapshot.parent.url[0].path;
    this.componentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === componentRoute);
  }
}
