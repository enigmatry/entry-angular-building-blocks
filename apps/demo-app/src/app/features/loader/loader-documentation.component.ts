import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoaderExampleModule } from '../../examples/loader/loader-example.module';

@Component({
  standalone: true,
  templateUrl: './loader-documentation.component.html',
  imports: [
    SharedModule,
    LoaderExampleModule
  ]
})
export class LoaderDocumentationComponent { }
