import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { EntryButtonModule, provideEntryButtonConfig } from '@enigmatry/entry-components/button';
import { EntryCommonModule, provideEntryNativeTimeAdapter } from '@enigmatry/entry-components/common';
import { getMatDateLocale } from '../../localization';
import { DocumentationContentComponent } from './documentation-content/documentation-content.component';
import { CodeViewComponent } from './example-viewer/code-view/code-view.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { LandingComponent } from './landing/landing.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MaterialModule } from './material/material.module';
import { SortPipe } from './pipes/sort.pipe';

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
    }),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => getMatDateLocale()
    },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    provideEntryNativeTimeAdapter({
      parse: {
        dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm:ss'],
      },
      display: {
        dateInput: 'dd-MM-yyyy HH:mm:ss',
        monthYearLabel: 'LLL uuuu',
        dateA11yLabel: 'PP',
        monthYearA11yLabel: 'LLLL uuuu',
      }
    })
  ]
})
export class SharedModule { }
