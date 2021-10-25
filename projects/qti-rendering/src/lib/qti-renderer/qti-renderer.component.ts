import { Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MEDIA_SRC_PROVIDER } from '../constants';
import { QtiInteractionElement } from '../interactions/qti-interaction.component';
import { MediaEmbed } from '../models/mediaEmbed';
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
     setTimeout(() => this.mediaEmbedReplaceHtml(), 0);
    }
  }

  private _content = new BehaviorSubject<string>(null);

  constructor(@Inject(MEDIA_SRC_PROVIDER) private mediaSrcProvider: MediaSrcProvider, elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  @HostListener('click', ['$event.target']) onClick(target: Element) {
    this.accordionOnClickHandler(target);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  private get interactions(): QtiInteractionElement[] {
    return this.getDescendantsOfType<QtiInteractionElement>(QtiInteractionElement);
  }

  get isReadonly(): boolean {
    return this.interactions.every(interaction => interaction.isReadonly);
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

  showAnswers(value: boolean = true): void {
    this.interactions.forEach(interaction => {
      if (value) {
        interaction.showAnswers();
      }
      else {
        interaction.hideAnswers();
      }
    });
  }

  private accordionOnClickHandler(target: Element) {
    if (target.matches('.accordion > .panel > h3')) {
      const targetPanel = target.closest('.panel');

      this.querySelectorAll('.accordion > .panel')
        .filter(panel => panel !== targetPanel)
        .forEach(panel => panel.classList.remove('expanded'));

      targetPanel.classList.toggle('expanded');
    }
  }

  private mediaEmbedReplaceHtml(): boolean {
    const elements = this.elementRef.nativeElement
      .querySelectorAll('figure.media > oembed[url]');

    if (elements?.length) {
      elements.forEach(media => {
        const url = media.getAttribute('url');
        const mediaElem = media.closest('figure.media');
        const mediaHtml = new MediaEmbed().getMediaHtml(url);
        mediaElem.insertAdjacentHTML('afterend', mediaHtml);
      });

      return true;
    }

    return false;
  }
}

