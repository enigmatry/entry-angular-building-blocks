import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Tags } from '../../models/constants';
import { QtiPrompt } from '../../models/qti-prompt.model';
import { QtiSimpleAssociableChoice } from '../../models/qti-simple-associable-choice.model';
import { ResultDeclaration } from '../../models/response-declaration';
import { QtiInteractionElement } from '../qti-interaction.component';

@Component({
  templateUrl: './qti-match-interaction.component.html',
  styleUrls: ['./qti-match-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class QtiMatchInteractionComponent extends QtiInteractionElement implements OnInit, OnDestroy {

  prompt: QtiPrompt;

  dragList: QtiSimpleAssociableChoice[];
  dropList: QtiSimpleAssociableChoice[];
  firstList: Array<QtiSimpleAssociableChoice[]> = new Array<QtiSimpleAssociableChoice[]>();
  results: Array<QtiSimpleAssociableChoice[]> = new Array<QtiSimpleAssociableChoice[]>();

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.prompt = new QtiPrompt(this.querySelector(Tags.QtiPrompt));

    this.dragList = this.querySelectorAll(Tags.QtiSimpleMatchSet + ':first-child ' + Tags.QtiSimpleAssociableChoice)
    .map(el => new QtiSimpleAssociableChoice(el));

    this.dropList = this.querySelectorAll(Tags.QtiSimpleMatchSet + ':last-child ' + Tags.QtiSimpleAssociableChoice)
        .map(el => new QtiSimpleAssociableChoice(el));

    this.dropList.forEach((element, index) => {
      if (element.matchValue === '' || element.matchValue === null) {
        this.results[index] = [];
      }
      else {
        this.results[index] = [this.dragList.find(x => x.identifier === element.matchValue)];
      }
    });
    this.dragList.forEach((element, index) => {
      if (this.dropList.filter(x => x.matchValue === element.identifier).length > 0) {
        this.firstList[index] = [];
      } else {
        this.firstList[index] = [element];
      }
    });
  }

  drop(event: CdkDragDrop<QtiSimpleAssociableChoice[]>) {
    if (event.container.data.length === 0 && !(event.container.id === event.previousContainer.id))
    {
      if (this.getDropIdentifiers().includes(event.container.id)
        && this.getDropIdentifiers().includes(event.previousContainer.id)) {
        // move inside the second list
        this.results[this.getDropIdentifiers().indexOf(event.container.id)] = event.previousContainer.data;
        this.results[this.getDropIdentifiers().indexOf(event.previousContainer.id)] = [];
      } else if (this.getDragIdentifiers().includes(event.container.id)
          && this.getDragIdentifiers().includes(event.previousContainer.id))  {
        // move inside the first list
        this.firstList[this.getDragIdentifiers().indexOf(event.container.id)] = event.previousContainer.data;
        this.firstList[this.getDragIdentifiers().indexOf(event.previousContainer.id)] = [];
      } else {
        // move between lists
        if (this.getDropIdentifiers().indexOf(event.container.id) !== -1)
        {
          this.results[this.getDropIdentifiers().indexOf(event.container.id)] = event.previousContainer.data;
          this.firstList[this.getDragIdentifiers().indexOf(event.previousContainer.id)] = [];
        }
        else
        {
          this.firstList[this.getDragIdentifiers().indexOf(event.container.id)] = event.previousContainer.data;
          this.results[this.getDropIdentifiers().indexOf(event.previousContainer.id)] = [];
        }
      }
    }
  }

  getDropIdentifiers(): string[]
  {
    return this.dropList.map(g => g.identifier);
  }

  getDragIdentifiers(): string[]
  {
    return this.dragList.map(g => g.identifier);
  }

  hasResult(): boolean {
    return this.results.filter(x => x.length > 0).length > 0;
  }

  getResult(): ResultDeclaration {
    const responses = [];
    this.dropList.forEach((el, index) => {
      if (this.results[index].length > 0)
      {
        responses.push(el.identifier + ' ' + this.results[index][0].identifier);
      }
    });
    return { identifier: this.responseIdentifier, values: responses };
  }

  get showCorrectStatus(): boolean {
    return this.dropList.some(c => c.correctValue);
  }

  getCorrectnessClasses(index: number): string {
    if (this.showCorrectStatus) {
      return (this.results[index].length !== 0
         && this.dropList[index].correctValue !== null
         && this.dropList[index].correctValue === this.results[index][0].identifier) ? 'correct' : 'incorrect';
    }
    return '';
  }

  getCorrectAnswer(identifier: string): string {
    return this.dragList.find(x => x.identifier === identifier).innerHTML;
  }

  reset(): void {
    this.firstList = this.dragList.map(x => [x]);
    this.results = this.dropList.map(x => []);
    this.dropList.forEach(x => x.correctValue = null);
    this.showCorrectAnswers = false;
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
  }
}
