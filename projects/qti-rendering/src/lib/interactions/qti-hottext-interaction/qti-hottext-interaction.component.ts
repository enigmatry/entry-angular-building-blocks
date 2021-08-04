import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { QtiInteractionElement } from '../qti-interaction.component';
import { ResultDeclaration } from '../../models/response-declaration';
import { QtiHottextComponent } from './qti-hottext/qti-hottext.component';

@Component({
  templateUrl: './qti-hottext-interaction.component.html',
  styleUrls: ['./qti-hottext-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiHottextInteractionComponent extends QtiInteractionElement implements OnInit, OnDestroy {

  @Input() maxChoices = 1;
  @Input() minChoices = 0; // 0 (unlimited)

  constructor(elementRef: ElementRef<Element>) { super(elementRef); }

  ngOnInit(): void {
    super.ngOnInit();
  }

  hasResult(): boolean {
    return this.hotTextChildren.some(c => c.checked);
  }

  getResult(): ResultDeclaration {
    const checked = this.hotTextChildren.filter(c => c.checked).map(c => c.identifier);
    return { identifier: this.responseIdentifier, values: checked };
  }

  reset(): void {
    this.hotTextChildren.forEach(c => {
      c.checked = false;
      c.correctnessClasses = '';
    });
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
    this.hotTextChildren.forEach(hotText => hotText.showAnswers());
  }

  private get hotTextChildren(): QtiHottextComponent[] {
    return this.getDescendantsOfType(QtiHottextComponent);
  }

}
