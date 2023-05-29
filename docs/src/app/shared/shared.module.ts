import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DocumentationContentComponent } from './documentation-content/documentation-content.component';
import { LandingComponent } from './landing/landing.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { AsMarkdownCodePipe } from './pipes/as-markdown-code.pipe';

@NgModule({
  declarations: [
    DocumentationContentComponent,
    LandingComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent,
    MarkdownPipe,
    AsMarkdownCodePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DocumentationContentComponent,
    ExampleViewerComponent,
    MarkdownViewerComponent,
    MarkdownPipe,
    AsMarkdownCodePipe
  ]
})
export class SharedModule { }
