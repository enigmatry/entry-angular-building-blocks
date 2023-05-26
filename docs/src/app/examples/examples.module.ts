import { NgModule } from '@angular/core';
import { DialogExamplesModule } from './dialog/dialog-examples.module';
import { HeaderExamplesModule } from './header/header-examples.module';

@NgModule({
  exports: [
    DialogExamplesModule,
    HeaderExamplesModule
  ]
})
export class ExamplesModule { }
