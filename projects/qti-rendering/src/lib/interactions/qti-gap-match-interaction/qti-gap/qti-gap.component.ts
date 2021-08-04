import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.gapTextList = new Array<QtiGapText>();
  }

  drop(event: CdkDragDrop<any>) {
    if (this.gapTextList.length === 0) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
       } else {
         // move to the other list
         transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }
}
