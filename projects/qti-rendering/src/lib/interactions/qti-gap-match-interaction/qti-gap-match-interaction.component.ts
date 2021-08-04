import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Tags } from '../../models/constants';
import { QtiGapText } from '../../models/qti-gap-text.model';
import { QtiPrompt } from '../../models/qti-prompt.model';
import { ResultDeclaration } from '../../models/response-declaration';
import { QtiInteractionElement } from '../qti-interaction.component';
import { QtiGapComponent } from './qti-gap/qti-gap.component';

@Component({
  templateUrl: './qti-gap-match-interaction.component.html',
  styleUrls: ['./qti-gap-match-interaction.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiGapMatchInteractionComponent extends QtiInteractionElement  implements OnInit, AfterViewChecked, OnDestroy {

  @Input() maxMatch = 1;         // optional, 0 (unlimited)

  prompt: QtiPrompt;
  allGapTexts: QtiGapText[];
  isInitialized = false;
  firstList: Array<QtiGapText[]> = new Array<QtiGapText[]>();
  results: Array<QtiGapText[]> = new Array<QtiGapText[]>();

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.prompt = new QtiPrompt(this.querySelector(Tags.QtiPrompt));
    this.allGapTexts = this.querySelectorAll(Tags.QtiGapText).map(el => new QtiGapText(el));
    this.firstList = this.allGapTexts.map(text => text.matchValue == null ? [text] : []);
    // this.results = this.allGapTexts.map(text => text.matchValue == null ? [] : [text]);
  }

  ngAfterViewChecked(): void {
    // if (!this.isInitialized) {
    //   this.allGapTexts.filter(text => text.matchValue != null).forEach(gapText =>
    //     {
    //       this.gapChildren.find(gap => {
    //         if (gap.identifier === gapText.matchValue){
    //           gap.gapTextList = [gapText];
    //         }
    //       })
    //     });
    // }
  }

  drop(event: CdkDragDrop<QtiGapText[]>) {
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
  //   if (event.previousContainer === event.container) {
  //    moveItemInArray(
  //      event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //    );
  //   } else {
  //     // move to the other list
  //     transferArrayItem(
  //      event.previousContainer.data,
  //      event.container.data,
  //      event.previousIndex,
  //      event.currentIndex
  //    );
  //  }
  }

  getDropIdentifiers(): string[]
  {
    return this.gapChildren.map(g => g.identifier);
  }

  getDragIdentifiers(): string[]
  {
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

  reset(): void {
    this.isInitialized = true;
    this.firstList = this.allGapTexts.map(text => [text]);// [...this.allGapTexts];
    this.gapChildren.forEach(x => x.gapTextList = []);
  }

  showAnswers(): void {
    this.showCorrectAnswers = true;
  }

  private get gapChildren(): QtiGapComponent[] {
    return this.getDescendantsOfType(QtiGapComponent);
  }
}
