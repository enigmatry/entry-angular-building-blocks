import { inject } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

/** What an `EntryFieldFormatDirective` does for the actions it deferred, once the composition ends. */
export interface EntryFieldCompositionHandlers {
  /** Parses the text again with a definition that changed during the composition. */
  reparse: (blurPending: boolean) => void;
  /** Parses the text composed in buffered mode. */
  parse: () => void;
  /** Republishes the parse error when input during the composition already parsed the text with a new definition. */
  publishParseError: (blurPending: boolean) => void;
  touch: () => void;
  render: () => void;
}

/**
 * IME composition state of an `EntryFieldFormatDirective`: whether input is buffered while composing, as in Angular's
 * `DefaultValueAccessor`, and which refresh, blur or render has to wait until the composition ends, so that none of
 * them overwrites the text being composed. Created in an injection context.
 */
export class EntryFieldComposition {
  readonly buffered = inject(COMPOSITION_BUFFER_MODE, { optional: true }) ?? !isAndroid();

  private active = false;
  private refreshPending = false;
  private refreshParsed = false;
  private blurPending = false;
  private renderPending = false;
  /** The form wrote a value during the composition, which replaces the composed text. */
  private superseded = false;

  readonly start = (): void => {
    this.active = true;
  };

  readonly isActive = (): boolean => this.active;

  readonly deferRefresh = (): boolean => {
    if (this.active) {
      this.refreshPending = true;
      this.refreshParsed = false;
    }
    return this.active;
  };

  readonly deferBlur = (): boolean => {
    this.blurPending ||= this.active;
    return this.active;
  };

  readonly deferRender = (): boolean => {
    this.renderPending ||= this.active;
    return this.active;
  };

  readonly supersede = (): void => {
    this.superseded ||= this.active;
  };

  /** The latest text was parsed with the current definition, so a refresh deferred before it needs no second parse. */
  readonly inputParsed = (): void => {
    this.refreshParsed = this.refreshPending;
  };

  /** Ends the composition: parses the composed text, then delivers the blur and render deferred during it. */
  readonly end = (handlers: EntryFieldCompositionHandlers): void => {
    const blur = this.blurPending;
    const render = blur || this.renderPending || this.superseded;
    const reparse = !this.superseded && this.refreshPending && !this.refreshParsed;
    const parse = !this.superseded && !reparse && this.buffered;
    const publish = !this.superseded && this.refreshParsed;
    this.active = false;
    this.refreshPending = false;
    this.refreshParsed = false;
    this.blurPending = false;
    this.renderPending = false;
    this.superseded = false;
    if (reparse) {
      handlers.reparse(blur);
    } else if (parse) {
      handlers.parse();
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
}
