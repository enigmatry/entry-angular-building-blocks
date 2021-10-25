import { Component, OnInit, ElementRef, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { ChoiceType } from '../../models/choice-type.enum';
import { QtiPrompt } from '../../models/qti-prompt.model';
import { QtiSimpleChoice } from '../../models/qti-simple-choice.model';
import { QtiInteractionElement } from '../qti-interaction.component';
import { ResultDeclaration } from '../../models/response-declaration';
import { Tags } from '../../models/constants';
import { shuffleWithFixedPositions, toBoolean } from '../../models/utils';

const single = '1';
const unlimited = '0';

@Component({
  templateUrl: './choice-interaction.component.html',
  styleUrls: ['./choice-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChoiceInteractionComponent extends QtiInteractionElement implements OnInit, OnDestroy {

  @Input() responseIdentifier: string;  // required
  @Input() maxChoices = single;         // optional, 0 (unlimited)
  @Input() minChoices = unlimited;      // optional, 0 (unlimited)
  @Input() shuffle: string;             // optional

  disabled = false;

  get choiceType(): ChoiceType {
    return this.maxChoices === single ? ChoiceType.Single : ChoiceType.Multiple;
  }

  get inputType(): 'radio' | 'checkbox' {
    return this.choiceType === ChoiceType.Single ? 'radio' : 'checkbox';
  }

  get checkedCount(): number {
    return this.simpleChoices?.filter(c => c.checked).length;
  }
  get isValid(): boolean {
    return this.minChoices ? this.checkedCount >= Number(this.minChoices) : true;
  }
  get isAnswered(): boolean {
    return this.checkedCount > 0;
  }

  prompt: QtiPrompt;
  simpleChoices: QtiSimpleChoice[];
  correctnessClasses: string;

  constructor(elementRef: ElementRef<Element>) { super(elementRef); }

  ngOnInit(): void {
    super.ngOnInit();
    this.prompt = new QtiPrompt(this.querySelector(Tags.QtiPrompt));
    this.simpleChoices = this.querySelectorAll(Tags.QtiSimpleChoice).map(el => new QtiSimpleChoice(el));
    this.disabled = this.isReadonly;

    if (toBoolean(this.shuffle)) {
      this.shuffleChoices();
    }
  }

  onClick(event: Event, checked: boolean): boolean {
    if (checked && this.isMaxCheckedLimitReached()) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onChecked(choice: QtiSimpleChoice, checked: boolean) {
    if (this.choiceType === ChoiceType.Single) {
      this.simpleChoices.forEach(c => c.checked = false);
    }
    choice.checked = checked;
  }

  getCorrectnessClasses(choice: QtiSimpleChoice): string {
    const anyValueIsCorrect = !this.simpleChoices.some(x => x.correct);

    if (choice.correct != null) {
      if (choice.checked) {
        return (anyValueIsCorrect || choice.correct) ? 'checked correct' : 'checked incorrect';
      } else {
        return (this.showCorrectAnswers && (anyValueIsCorrect || choice.correct)) ? 'correct-answer' : '';
      }
    }
    return choice.checked ? 'checked' : '';
  }

  isMaxCheckedLimitReached(): boolean {
    if (this.maxChoices === unlimited || this.maxChoices === single) { return false; }
    return this.checkedCount >= Number(this.maxChoices);
  }

  hasResult(): boolean {
    return this.simpleChoices.some(c => c.checked);
  }

  getResult(): ResultDeclaration {
    const checked = this.simpleChoices.filter(c => c.checked).map(c => c.identifier);
    return { identifier: this.responseIdentifier, values: checked };
  }

  shuffleChoices() {
    const fixedOrNot = this.simpleChoices.map(c => c.fixed);
    this.simpleChoices = shuffleWithFixedPositions(this.simpleChoices, fixedOrNot);
  }

  reset(): void {
    this.showCorrectAnswers = false;
    this.simpleChoices.forEach(c => {
      c.checked = false;
      c.correct = null;
    });
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
