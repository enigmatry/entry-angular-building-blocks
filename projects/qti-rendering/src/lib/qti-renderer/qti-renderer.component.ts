import { Component, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MEDIA_SRC_PROVIDER } from '../constants';
import { QtiInteractionElement } from '../interactions/qti-interaction.component';
import { ResultDeclaration } from '../models/response-declaration';
import { QtiElement } from '../qti-element';
import { MediaSrcProvider } from '../services/media-src-provider.service';

@Component({
  selector: 'enigmatry-qti-renderer',
  templateUrl: './qti-renderer.component.html',
  styleUrls: ['./qti-renderer.component.scss'],
})
export class QtiRendererComponent extends QtiElement implements OnInit, OnDestroy {

  @Input()
  get content(): any {
    return this._content.value;
  }
  set content(content: any) {
    if (content) {
     this._content.next(content);
    }
  }

  private _content = new BehaviorSubject<string>(null);

  constructor(@Inject(MEDIA_SRC_PROVIDER) private mediaSrcProvider: MediaSrcProvider, elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  private get interactions(): QtiInteractionElement[] {
    return this.getDescendantsOfType<QtiInteractionElement>(QtiInteractionElement);
  }

  get isAnswered(): boolean {
    return this.interactions.every(interaction => interaction.hasResult());
  }

  get isPartiallyAnswered(): boolean {
    return this.interactions.filter(interaction => interaction.hasResult()).length > 0;
  }

  getResults(): ResultDeclaration[] {
    return  this.interactions.map(interaction => interaction.getResult());
  }

  reset(): void {
    // this._content.next(this._content.value + ' ');
    this.interactions.forEach(interaction => interaction.reset());
  }

  showAnswers(): void {
    this.interactions.forEach(interaction => {
      interaction.showAnswers();
    });
  }
}

