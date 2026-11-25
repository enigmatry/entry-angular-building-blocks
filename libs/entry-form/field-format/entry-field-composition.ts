import { inject } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

export interface EntryFieldCompositionHandlers {
  refresh: (edited: boolean, blurPending: boolean) => void;
  parse: (blurPending: boolean) => void;
  publishParseError: (blurPending: boolean) => void;
  touch: () => void;
  render: () => void;
}

/** Must be created in an injection context. */
export class EntryFieldComposition {
  private readonly buffered = inject(COMPOSITION_BUFFER_MODE, { optional: true }) ?? !isAndroid();

  private active = false;
  private edited = false;
  private refreshPending = false;
  private refreshParsed = false;
  private blurPending = false;
  private renderPending = false;
  private superseded = false;
  private handledState?: string | null;

  constructor(private readonly element: HTMLInputElement | HTMLTextAreaElement) {}

  readonly start = (): void => {
    this.active = true;
  };

  readonly absorbsInput = (): boolean => {
    this.edited ||= this.active;
    // Some IMEs send one more input event after a composition has ended, for text that is handled already.
    return this.active ? this.buffered : this.state() === this.handledState;
  };

  readonly refreshWhenIdle = (refresh: () => void): void => {
    if (this.active) {
      this.refreshPending = true;
      this.refreshParsed = false;
    } else {
      refresh();
    }
  };

  readonly blurWhenIdle = (blur: () => void): void => {
    if (this.active) {
      this.blurPending = true;
    } else {
      blur();
    }
  };

  readonly renderWhenIdle = (render: () => void): void => {
    if (this.active) {
      this.renderPending = true;
    } else {
      render();
    }
  };

  readonly supersede = (): void => {
    this.superseded ||= this.active;
  };

  readonly parsed = (): void => {
    this.refreshParsed = this.refreshPending;
    this.superseded = false;
    this.handledState = this.state();
  };

  readonly rendered = (): void => {
    // Not this.state(): a render also runs on a server, where the DOM may have no validity to read.
    this.handledState = this.element.value;
  };

  readonly end = (handlers: EntryFieldCompositionHandlers): void => {
    const blur = this.blurPending;
    const unparsed = this.state() !== this.handledState;
    const edited = this.edited || unparsed;
    const render = blur || this.renderPending || this.superseded;
    const refresh = !this.superseded && this.refreshPending && !this.refreshParsed;
    const parse = !this.superseded && !refresh && (this.buffered ? edited : unparsed);
    const publish = !this.superseded && this.refreshParsed;
    this.reset();
    if (refresh) {
      handlers.refresh(edited, blur);
    } else if (parse) {
      handlers.parse(blur);
    }
    if (publish) {
      handlers.publishParseError(blur);
    }
    if (blur) {
      handlers.touch();
    }
    if (render) {
      handlers.render();
    }
  };

  // A native number input that holds text that is not a number reads as empty; only its validity tells the two apart.
  private readonly state = (): string | null => !this.element.value && this.element.validity.badInput ? null : this.element.value;

  private readonly reset = (): void => {
    this.active = false;
    this.edited = false;
    this.refreshPending = false;
    this.refreshParsed = false;
    this.blurPending = false;
    this.renderPending = false;
    this.superseded = false;
  };
}
