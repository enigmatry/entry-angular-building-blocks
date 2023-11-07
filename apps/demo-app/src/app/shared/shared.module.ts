import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DocumentationContentComponent } from './documentation-content/documentation-content.component';
import { LandingComponent } from './landing/landing.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { SortPipe } from './pipes/sort.pipe';
import { CodeViewComponent } from './example-viewer/code-view/code-view.component';
import { EntryButtonModule, provideEntryButtonConfig } from '@enigmatry/entry-components/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryCommonModule } from '@enigmatry/entry-components/common';

@NgModule({
  declarations: [
    DocumentationContentComponent,
    LandingComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent,
    SortPipe,
    CodeViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EntryButtonModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EntryButtonModule,
    EntryCommonModule,
    DocumentationContentComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent,
    SortPipe
  ],
  providers: [
    provideEntryButtonConfig({
      submit: { type: 'raised', color: 'primary' },
      cancel: { type: 'basic' }
    })
  ]
})
export class SharedModule { }
