import { Component, inject } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { COMPONENT_DEFINITIONS, IComponentDefinition } from '../../features/component-definitions';
import { MarkdownViewerComponent } from '../markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'app-documentation-content',
  templateUrl: './documentation-content.component.html',
  styleUrl: './documentation-content.component.scss',
  imports: [MatTabGroup, MatTab, MarkdownViewerComponent]
})
export class DocumentationContentComponent {
  readonly componentDefinition: IComponentDefinition | undefined =
    COMPONENT_DEFINITIONS.find(c => inject(Router).url.includes(c.route));
}
