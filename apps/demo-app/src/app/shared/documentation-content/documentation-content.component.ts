import { Component, OnInit } from '@angular/core';
import { COMPONENT_DEFINITIONS, IComponentDefinition } from '../../features/component-definitions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documentation-content',
  templateUrl: './documentation-content.component.html',
  styleUrls: ['./documentation-content.component.scss']
})
export class DocumentationContentComponent implements OnInit {
  componentDefinition: IComponentDefinition;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const componentRoute = this.activatedRoute.snapshot.url[0].path;
    this.componentDefinition = COMPONENT_DEFINITIONS.find(c => c.route === componentRoute);
  }
}
