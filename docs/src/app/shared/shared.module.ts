import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DocumentationContentComponent } from './documentation-content/documentation-content.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { LandingComponent } from './landing/landing.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MarkdownPipe } from './pipes/markdown.pipe';

@NgModule({
  declarations: [
    DocumentationContentComponent,
    CodeSnippetComponent,
    LandingComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent,
    MarkdownPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DocumentationContentComponent,
    CodeSnippetComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent,
    MarkdownPipe
  ]
})
export class SharedModule { }
