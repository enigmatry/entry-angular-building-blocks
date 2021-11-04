import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { QtiInteractionElement } from '../qti-interaction.component';
import { ResultDeclaration } from '../../models/response-declaration';

@Component({
  templateUrl: './qti-text-entry-interaction.component.html',
  styleUrls: ['./qti-text-entry-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiTextEntryInteractionComponent extends QtiInteractionElement implements OnInit, OnDestroy {

  @Input() patternMask: string;
  @Input() placeholderText = '';
  @Input() expectedLength: number;

  value: string;
  correctValue: string;
  isCorrect: boolean;
  correctnessClasses: string;
  disabled = false;

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
    this.value = elementRef.nativeElement.getAttribute('data-entered');
    if (elementRef.nativeElement.hasAttribute('data-correct')) {
      this.correctValue = elementRef.nativeElement.getAttribute('data-correct');
      this.isCorrect = this.correctValue &&
        (this.correctValue === '' || (this.correctValue.split('/').map(x => x.trim()).filter(x => x === this.value).length > 0));
      this.correctnessClasses = this.isCorrect ? 'correct' : 'incorrect';
    }
   }

   ngOnInit(): void {
    super.ngOnInit();
    this.disabled = this.isReadonly;
  }

  hasResult(): boolean {
    return Boolean(this.value);
  }

  get shownCorrectValue(): string {
    return (this.showCorrectAnswers ? this.correctValue : '');
  }

  getResult(): ResultDeclaration {
    return { identifier: this.responseIdentifier, values: [this.value] };
  }

  reset(): void {
    this.showCorrectAnswers = false;
    this.value = '';
    this.correctnessClasses = '';
    this.correctValue = '';
    this.disabled = false;
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
  }

  hideAnswers(): void {
    this.showCorrectAnswers = false;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
