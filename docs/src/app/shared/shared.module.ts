import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DocsContentComponent } from './docs-content/docs-content.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    DocsContentComponent,
    CodeSnippetComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DocsContentComponent,
    CodeSnippetComponent
  ]
})
export class SharedModule { }
