import { inject } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

/** What an `EntryFieldFormatDirective` does for the actions it deferred, once the composition ends. */
export interface EntryFieldCompositionHandlers {
  /** Applies a definition that changed during the composition; `edited` says whether the composition changed the text. */
  refresh: (edited: boolean, blurPending: boolean) => void;
  /** Parses the composed text: all of it in buffered mode, otherwise text that no input event announced. */
  parse: () => void;
  /** Republishes the parse error when input during the composition already parsed the text with a new definition. */
  publishParseError: (blurPending: boolean) => void;
  touch: () => void;
  render: () => void;
  /** The text of the field. */
  text: () => string;
}

/**
 * IME composition state of an `EntryFieldFormatDirective`: whether input is buffered while composing, as in Angular's
 * `DefaultValueAccessor`, and which refresh, blur or render has to wait until the composition ends, so that none of
 * them overwrites the text being composed. Created in an injection context.
 */
export class EntryFieldComposition {
  readonly buffered = inject(COMPOSITION_BUFFER_MODE, { optional: true }) ?? !isAndroid();

  private active = false;
  private edited = false;
  private refreshPending = false;
  private refreshParsed = false;
  private blurPending = false;
  private renderPending = false;
  /** The form wrote a value during the composition, which replaces the composed text. */
  private superseded = false;
  /** The text the model is up to date with: what was last parsed or rendered. */
  private handledText: string | null = null;

  readonly start = (): void => {
    this.active = true;
  };

  /**
   * Whether an input event needs no parsing: buffered input during a composition, or the input event some IMEs send
   * after the composition ended, for text that is handled already (parsed, and maybe rendered since).
   */
  readonly absorbsInput = (text: string, fromIme: boolean): boolean => {
    this.edited ||= this.active;
    return this.active ? this.buffered : fromIme && text === this.handledText;
  };

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

  /**
   * `text` was parsed with the current definition, so a refresh deferred before it needs no second parse, and input
   * parsed during a composition takes over from a value the form wrote earlier in it.
   */
  readonly parsed = (text: string): void => {
    this.refreshParsed = this.refreshPending;
    this.superseded = false;
    this.handledText = text;
  };

  readonly rendered = (text: string): void => {
    this.handledText = text;
  };

  /** Ends the composition: parses the composed text, then delivers the blur and render deferred during it. */
  readonly end = (handlers: EntryFieldCompositionHandlers): void => {
    const blur = this.blurPending;
    const unparsed = handlers.text() !== this.handledText;
    const edited = this.edited || unparsed;
    const render = blur || this.renderPending || this.superseded;
    const refresh = !this.superseded && this.refreshPending && !this.refreshParsed;
    const parse = !this.superseded && !refresh && (this.buffered ? edited : unparsed);
    const publish = !this.superseded && this.refreshParsed;
    this.reset();
    if (refresh) {
      handlers.refresh(edited, blur);
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
