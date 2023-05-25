import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DocsContentComponent } from './docs-content/docs-content.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { LandingComponent } from './landing/landing.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';

@NgModule({
  declarations: [
    DocsContentComponent,
    CodeSnippetComponent,
    LandingComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DocsContentComponent,
    CodeSnippetComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent
  ]
})
export class SharedModule { }
