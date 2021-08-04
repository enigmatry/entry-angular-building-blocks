import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { QtiInteractionElement } from '../qti-interaction.component';
import { ResultDeclaration } from '../../models/response-declaration';
import { QtiInlineChoice } from '../../models/qti-inline-choice.model';
import { Tags } from '../../models/constants';
import { shuffleWithFixedPositions, toBoolean } from '../../models/utils';

@Component({
  templateUrl: './qti-inline-choice-interaction.component.html',
  styleUrls: ['./qti-inline-choice-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class QtiInlineChoiceInteractionComponent extends QtiInteractionElement implements OnInit, OnDestroy {
  @Input() responseIdentifier: string;  // required
  @Input() required = false;  // optional
  @Input() shuffle: string;   // optional

  options: QtiInlineChoice[];
  selectedOption: QtiInlineChoice;
  correctOption: QtiInlineChoice;
  correctnessClasses: string;

  public get prompt(): string {
    return this.element.getAttribute('data-prompt');
  }

  constructor(elementRef: ElementRef<Element>) { super(elementRef); }

  ngOnInit(): void {
    super.ngOnInit();

    this.options = this.querySelectorAll(Tags.QtiInlineChoice).map(el => new QtiInlineChoice(el));
    this.selectedOption = this.options.find(o => o.selected);  // pre-selected
    this.correctOption = this.options.find(o => o.isCorrect);
    if (this.options.filter(x => x.isCorrect != null).length > 0) {
      this.correctnessClasses = (this.options.filter(o => o.selected && o.isCorrect).length > 0) ? 'correct' : 'incorrect';
    }

    if (toBoolean(this.shuffle)) {
      this.shuffleOptions();
    }
  }

  hasResult(): boolean {
    return Boolean(this.selectedOption);
  }

  getResult(): ResultDeclaration {
    return { identifier: this.responseIdentifier, values: [this.selectedOption?.identifier] };
  }

  shuffleOptions() {
    const fixedOrNot = this.options.map(c => c.fixed);
    this.options = shuffleWithFixedPositions(this.options, fixedOrNot);
  }

  reset(): void {
    this.selectedOption = null;
    this.showCorrectAnswers = false;
    this.correctnessClasses = '';
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
