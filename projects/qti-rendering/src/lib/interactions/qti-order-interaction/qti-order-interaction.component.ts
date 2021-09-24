import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Tags } from '../../models/constants';
import { QtiPrompt } from '../../models/qti-prompt.model';
import { QtiSimpleChoice } from '../../models/qti-simple-choice.model';
import { ResultDeclaration } from '../../models/response-declaration';
import { shuffleWithFixedPositions, toBoolean } from '../../models/utils';
import { QtiInteractionElement } from '../qti-interaction.component';

@Component({
  templateUrl: './qti-order-interaction.component.html',
  styleUrls: ['./qti-order-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiOrderInteractionComponent extends QtiInteractionElement  implements OnInit, OnDestroy {

  @Input() maxChoices = 1;         // optional, 0 (unlimited)
  @Input() minChoices = 0;      // optional, 0 (unlimited)
  @Input() shuffle: string;     // optional

  prompt: QtiPrompt;
  simpleChoices: QtiSimpleChoice[];
  notOrderedChoices: Array<QtiSimpleChoice[]> = new Array<QtiSimpleChoice[]>();
  orderedChoices: Array<QtiSimpleChoice[]> = new Array<QtiSimpleChoice[]>();
  correctValues: string[] = [];

  constructor(elementRef: ElementRef<Element>) { super(elementRef); }

  ngOnInit(): void {
    super.ngOnInit();
    this.prompt = new QtiPrompt(this.querySelector(Tags.QtiPrompt));
    this.simpleChoices = this.querySelectorAll(Tags.QtiSimpleChoice).map(el => new QtiSimpleChoice(el));

    if (this.showCorrectStatus) {
      this.correctValues = this.simpleChoices.sort((a, b) => a.correctOrderNumber < b.correctOrderNumber ?  -1 : 1).map(c => c.innerHTML);
    }

    for (let i = 0; i < this.simpleChoices.length; i++) {
      if (this.orderedChoices[i] == null) {
        this.orderedChoices[i] = [];
      }
      const choice = this.simpleChoices[i];
      if (choice.orderNumber > -1) {
        this.orderedChoices[choice.orderNumber] = [choice];
      } else if (choice.fixed) {
        this.orderedChoices[i] = [choice];
      }

      if (!choice.fixed && choice.orderNumber === -1) {
        this.notOrderedChoices[i] = [choice];
      }
      else {
        this.notOrderedChoices[i] = [];
      }
    }

    if (toBoolean(this.shuffle)) {
      this.shuffleChoices();
    }
  }

  drop(event: CdkDragDrop<QtiSimpleChoice[]>) {
    if (event.container.data.length === 0 && !(event.container.id === event.previousContainer.id))
    {
      if (event.container.id.startsWith('not') && event.previousContainer.id.startsWith('not')) {
        // move inside same list
        this.notOrderedChoices[Number.parseInt(event.container.id.substr(17), 10)] = event.previousContainer.data;
        this.notOrderedChoices[Number.parseInt(event.previousContainer.id.substr(17), 10)] = [];
      } else if (event.container.id.startsWith('ordered') && event.previousContainer.id.startsWith('ordered')) {
        this.orderedChoices[Number.parseInt(event.container.id.substr(14), 10)] = event.previousContainer.data;
        this.orderedChoices[Number.parseInt(event.previousContainer.id.substr(14), 10)] = [];
      } else {
        // move between lists
        if (event.container.id.startsWith('orderedChoices'))
        {
          this.orderedChoices[Number.parseInt(event.container.id.substr(14), 10)] = event.previousContainer.data;
          this.notOrderedChoices[Number.parseInt(event.previousContainer.id.substr(17), 10)] = [];
        }
        else
        {
          this.notOrderedChoices[Number.parseInt(event.container.id.substr(17), 10)] = event.previousContainer.data;
          this.orderedChoices[Number.parseInt(event.previousContainer.id.substr(14), 10)] = [];
        }
      }
    }
  }

  get showCorrectStatus(): boolean {
    return this.simpleChoices.some(c => c.correctOrderNumber !== -1);
  }

  getCorrectnessClasses(choices: QtiSimpleChoice[]): string {
    if (this.showCorrectStatus) {
      return (choices.length !== 0
        && choices[0].correctOrderNumber !== -1
        && choices[0].orderNumber === choices[0].correctOrderNumber) ? 'correct' : 'incorrect';
    }
    return '';
  }

  hasResult(): boolean {
    return this.orderedChoices.length > 0;
  }

  getResult(): ResultDeclaration {
    const choices = this.orderedChoices.map(c => c.length === 0 ? '' : c[0].identifier);
    return { identifier: this.responseIdentifier, values: choices };
  }

  shuffleChoices() {
    const fixedOrNot = this.simpleChoices.map(c => c.fixed);
    this.notOrderedChoices = shuffleWithFixedPositions(this.notOrderedChoices, []);
  }

  reset(): void {
    this.simpleChoices.forEach(c => c.correctOrderNumber = -1);
    this.orderedChoices = this.simpleChoices.map(x => x.fixed ? [x] : []);
    this.notOrderedChoices = this.simpleChoices.map(x => x.fixed ? [] : [x]);
    if (toBoolean(this.shuffle)) {
      this.shuffleChoices();
    }
    this.showCorrectAnswers = false;
    this.correctValues = [];
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
