import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { QtiGapText } from '../../../models/qti-gap-text.model';
import { QtiElement } from '../../../qti-element';

@Component({
  templateUrl: './qti-gap.component.html',
  styleUrls: ['./qti-gap.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiGapComponent extends QtiElement implements OnInit, OnDestroy {

  @Input() identifier: string;
  @Input() gapTextList: QtiGapText[];
  @Input() connectedLists: string[];
  @Input() correctValue: string = null;

  showAnswer = false;

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.gapTextList = new Array<QtiGapText>();
  }

  drop(event: CdkDragDrop<any>) {
    if (this.gapTextList.length === 0) {
      if (event.previousContainer.id !== event.container.id) {
         // move to the other list
         transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

  reset() {
    this.gapTextList = [];
    this.correctValue = null;
  }

  showCorrectAnswer() {
    this.showAnswer = true;
  }

  setCorrectValue(allGapTexts: QtiGapText[]) {
    if (this.element.hasAttribute('data-correct')) {
      this.correctValue = allGapTexts.find(gapText => gapText.identifier === this.element.getAttribute('data-correct')).innerHTML;
    }
  }

  getCorrectnessClasses(): string {
    if (this.correctValue) {
      return (this.gapTextList.length !== 0
         && this.gapTextList[0].innerHTML === this.correctValue) ? 'correct' : 'incorrect';
    }
    return '';
  }
}
