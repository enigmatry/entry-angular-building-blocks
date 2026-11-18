import { inject } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

export interface EntryFieldPendingActions {
  refresh: boolean;
  blur: boolean;
  render: boolean;
  /** The form wrote a value during the composition, which replaces the composed text. */
  superseded: boolean;
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
  private blurPending = false;
  private renderPending = false;
  private superseded = false;

  readonly start = (): void => {
    this.active = true;
  };

  readonly isActive = (): boolean => this.active;

  readonly deferRefresh = (): boolean => {
    this.refreshPending ||= this.active;
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

  /** The latest text was parsed with the current definition, so a refresh deferred before it is no longer needed. */
  readonly inputParsed = (): void => {
    this.refreshPending = false;
  };

  readonly end = (): EntryFieldPendingActions => {
    const pending = { refresh: this.refreshPending, blur: this.blurPending, render: this.renderPending, superseded: this.superseded };
    this.active = false;
    this.refreshPending = false;
    this.blurPending = false;
    this.renderPending = false;
    this.superseded = false;
    return pending;
  };
}
