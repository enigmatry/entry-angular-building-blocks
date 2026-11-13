import { Component } from '@angular/core';
import {
  AutoDisableButtonExampleComponent
} from '../../examples/common/directives/auto-disable-button-example/auto-disable-button-example.component';
import { EventPluginExampleComponent } from '../../examples/common/event-plugin-example/event-plugin-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-common-documentation',
    templateUrl: './common-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        AutoDisableButtonExampleComponent,
        EventPluginExampleComponent
    ]
})
export class CommonDocumentationComponent {
}
