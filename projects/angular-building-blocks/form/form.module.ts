import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultEnigmatryFormConfig, ENIGMATRY_FORM_CONFIG } from './from-config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{ provide: ENIGMATRY_FORM_CONFIG, useValue: new DefaultEnigmatryFormConfig() }]
})
export class EnigmatryFormModule { }
