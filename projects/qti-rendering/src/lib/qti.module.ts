import { CUSTOM_ELEMENTS_SCHEMA, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { ChoiceInteractionComponent } from './interactions/qti-choice-interaction/choice-interaction.component';
import { QtiTextEntryInteractionComponent } from './interactions/qti-text-entry-interaction/qti-text-entry-interaction.component';
import { QtiInlineChoiceInteractionComponent } from './interactions/qti-inline-choice-interaction/qti-inline-choice-interaction.component';
import { QtiHottextInteractionComponent } from './interactions/qti-hottext-interaction/qti-hottext-interaction.component';
import { QtiHottextComponent } from './interactions/qti-hottext-interaction/qti-hottext/qti-hottext.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QtiOrderInteractionComponent } from './interactions/qti-order-interaction/qti-order-interaction.component';
import { QtiGapMatchInteractionComponent } from './interactions/qti-gap-match-interaction/qti-gap-match-interaction.component';
import { QtiGapTextComponent } from './interactions/qti-gap-match-interaction/qti-gap-text/qti-gap-text.component';
import { QtiGapComponent } from './interactions/qti-gap-match-interaction/qti-gap/qti-gap.component';
import { QtiMatchInteractionComponent } from './interactions/qti-match-interaction/qti-match-interaction.component';
import { QtiCustomInteractionComponent } from './interactions/qti-custom-interaction/qti-custom-interaction.component';
import { IMediaSrcProvider, MediaSrcProvider } from './services/media-src-provider.service';
import { MEDIA_SRC_PROVIDER } from './constants';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { QtiRendererComponent } from './qti-renderer/qti-renderer.component';
import { QtiItemBodyComponent } from './qti-item-body/qti-item-body.component';
import { QtiFeedbackComponent } from './qti-feedback/qti-feedback.component';
import { CalculateInputWidthPipe } from './pipes/calculate-input-width.pipe';
import { CalculateTextEntryWidthPipe } from './pipes/calculate-text-entry-width.pipe';

export interface QtiModuleConfig {
  mediaSrcProvider?: Type<IMediaSrcProvider>;
}

@NgModule({
  declarations: [
    QtiRendererComponent,
    QtiItemBodyComponent,
    ChoiceInteractionComponent,
    QtiTextEntryInteractionComponent,
    QtiInlineChoiceInteractionComponent,
    QtiHottextInteractionComponent,
    QtiHottextComponent,
    QtiOrderInteractionComponent,
    QtiGapMatchInteractionComponent,
    QtiGapTextComponent,
    QtiGapComponent,
    QtiMatchInteractionComponent,
    QtiCustomInteractionComponent,
    SafeHtmlPipe,
    QtiItemBodyComponent,
    QtiFeedbackComponent,
    CalculateInputWidthPipe,
    CalculateTextEntryWidthPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    QtiRendererComponent,
    QtiFeedbackComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QtiModule {

  constructor(@Optional() injector: Injector, @Optional() @SkipSelf() parentModule?: QtiModule) {
    if (parentModule && customElements.get('qti-item-body') === undefined) {
      customElements.define('qti-item-body', createCustomElement(QtiItemBodyComponent, { injector }));
      customElements.define('qti-choice-interaction', createCustomElement(ChoiceInteractionComponent, { injector }));
      customElements.define('qti-inline-choice-interaction', createCustomElement(QtiInlineChoiceInteractionComponent, { injector }));
      customElements.define('qti-hottext-interaction', createCustomElement(QtiHottextInteractionComponent, { injector }));
      customElements.define('qti-hottext', createCustomElement(QtiHottextComponent, { injector }));
      customElements.define('qti-text-entry-interaction', createCustomElement(QtiTextEntryInteractionComponent, { injector }));
      customElements.define('qti-order-interaction', createCustomElement(QtiOrderInteractionComponent, { injector }));
      customElements.define('qti-gap-match-interaction', createCustomElement(QtiGapMatchInteractionComponent, { injector }));
      customElements.define('qti-gap', createCustomElement(QtiGapComponent, { injector }));
      customElements.define('qti-gap-text', createCustomElement(QtiGapTextComponent, { injector }));
      customElements.define('qti-match-interaction', createCustomElement(QtiMatchInteractionComponent, { injector }));
      customElements.define('qti-custom-interaction', createCustomElement(QtiCustomInteractionComponent, { injector }));
    }
  }

  static forRoot(config?: QtiModuleConfig): ModuleWithProviders<QtiModule> {
    return {
      ngModule: QtiModule,
      providers: [
        { provide: MEDIA_SRC_PROVIDER, useClass: config && config.mediaSrcProvider || MediaSrcProvider }
      ]
    };
  }
}
