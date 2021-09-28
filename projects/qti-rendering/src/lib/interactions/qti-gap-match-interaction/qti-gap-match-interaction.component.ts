import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Tags } from '../../models/constants';
import { QtiGapText } from '../../models/qti-gap-text.model';
import { QtiPrompt } from '../../models/qti-prompt.model';
import { ResultDeclaration } from '../../models/response-declaration';
import { shuffleWithFixedPositions, toBoolean } from '../../models/utils';
import { QtiInteractionElement } from '../qti-interaction.component';
import { QtiGapComponent } from './qti-gap/qti-gap.component';

@Component({
  templateUrl: './qti-gap-match-interaction.component.html',
  styleUrls: ['./qti-gap-match-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiGapMatchInteractionComponent extends QtiInteractionElement  implements OnInit, AfterViewChecked, OnDestroy {

  @Input() maxMatch = 1;         // optional, 0 (unlimited)
  @Input() shuffle: string;     // optional

  prompt: QtiPrompt;
  allGapTexts: QtiGapText[];
  isInitialized = false;
  firstList: Array<QtiGapText[]> = new Array<QtiGapText[]>();
  allListNames: string[];

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.prompt = new QtiPrompt(this.querySelector(Tags.QtiPrompt));
    this.allGapTexts = this.querySelectorAll(Tags.QtiGapText).map(el => new QtiGapText(el));
    if (toBoolean(this.shuffle)) {
      this.shuffleChoices();
    }
    this.firstList = this.allGapTexts.map(text => text.matchValue == null ? [text] : []);
  }

  ngAfterViewChecked(): void {
    if (!this.isInitialized) {
      this.allListNames = this.allGapTexts.map(x => x.identifier)
      .concat(this.gapChildren.map(x => x.identifier));
    this.allGapTexts.filter(text => text.matchValue != null).forEach(gapText =>
      {
        this.gapChildren.find(gap => {
          if (gap.identifier === gapText.matchValue){
            gap.gapTextList = [gapText];
          }
          gap.connectedLists = this.allListNames;
          gap.setCorrectValue(this.allGapTexts);
          this.isInitialized = true;
        });
      });
    }
  }

  drop(event: CdkDragDrop<QtiGapText[]>) {
    if (event.container.data.length === 0 && !(event.container.id === event.previousContainer.id))
    {
      if (this.isGapTextIdentifier(event.container.id)
          && this.isGapTextIdentifier(event.previousContainer.id))  {
        // move inside the first list
        this.firstList[this.getDragIdentifiers().indexOf(event.container.id)] = event.previousContainer.data;
        this.firstList[this.getDragIdentifiers().indexOf(event.previousContainer.id)] = [];
      } else {
        // move gapText back from gap
        this.firstList[this.getDragIdentifiers().indexOf(event.container.id)] = event.previousContainer.data;
        this.gapChild(event.previousContainer.id).reset();
      }
    }
  }

  isGapIdentifier(identifier: string): boolean {
    return this.getDropIdentifiers().includes(identifier);
  }

  isGapTextIdentifier(identifier: string): boolean {
    return this.getDragIdentifiers().includes(identifier);
  }

  getDropIdentifiers(): string[] {
    return this.gapChildren.map(g => g.identifier);
  }

  getDragIdentifiers(): string[] {
    return this.allGapTexts.map(g => g.identifier);
  }

  hasResult(): boolean {
    return this.gapChildren.length > 0;
  }

  getResult(): ResultDeclaration {
    const gaps = this.gapChildren.filter(g => g.gapTextList.length > 0)
      .map(c => c.gapTextList[0]?.identifier + ' ' + c.identifier);
    return { identifier: this.responseIdentifier, values: gaps };
  }

  shuffleChoices() {
    this.allGapTexts = shuffleWithFixedPositions(this.allGapTexts, []);
  }

  reset(): void {
    this.isInitialized = true;
    this.firstList = this.allGapTexts.map(text => [text]);
    if (toBoolean(this.shuffle)) {
      this.shuffleChoices();
    }
    this.gapChildren.forEach(x => x.reset());
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
    this.gapChildren.forEach(x => x.showCorrectAnswer());
  }

  private get gapChildren(): QtiGapComponent[] {
    return this.getDescendantsOfType(QtiGapComponent);
  }

  private gapChild(identifier: string): QtiGapComponent {
    return this.gapChildren.find(x => x.identifier === identifier);
  }
}
