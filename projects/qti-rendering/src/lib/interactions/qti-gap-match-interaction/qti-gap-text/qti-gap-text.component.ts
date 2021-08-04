import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Tags } from '../../../models/constants';
import { QtiGapText } from '../../../models/qti-gap-text.model';
import { QtiElement } from '../../../qti-element';

@Component({
  templateUrl: './qti-gap-text.component.html',
  styleUrls: ['./qti-gap-text.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiGapTextComponent extends QtiElement implements OnInit, OnDestroy {

  @Input() identifier: string;

  checked = false;
  gapText: QtiGapText;
  gapTexts: QtiGapText[];

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.gapText = new QtiGapText(this.querySelector(Tags.QtiGapText));
  }

  // onClick() {
  //   this.checked = !this.checked;
  // }

  // getIdentifier(): string {
  //   return this.identifier;
  // }

  // drop(event: CdkDragDrop<any>) {
  //   if (event.container.id === event.previousContainer.id) {
  //     // move inside same list
  //     moveItemInArray(this.gapTexts, event.previousIndex, event.currentIndex);
  //   } else {
  //     // move between lists
  //     console.log('moving to gap');
  //   }
  // }
}
