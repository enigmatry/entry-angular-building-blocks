import { Injectable } from '@angular/core';
import { debounce } from 'lodash-es';
import { EntryEventManagerPlugin } from './entry-event-manager.plugin';

/**
 * Provides event plugin for debouncing events.
 *
 * How to use:
 * <button (click.debounce)="doSomething($event)">
 * <input (keyup.debounce.500)="doSomething($event)">
 */
@Injectable()
export class DebounceEventPlugin extends EntryEventManagerPlugin {
  modifier = '.debounce';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- the signature of Angular's EventManagerPlugin
  addEventListener(element: HTMLElement, eventName: string, originalHandler: Function): Function {
    const [_modifier, milliseconds = 500, option = 'leading'] = this.unwrapParams(eventName);

    const innerHandler = (event: Event) => this.manager.getZone().runGuarded(() => originalHandler(event));

    const debouncedHandler = debounce(innerHandler, Number(milliseconds),
      { leading: option === 'leading', trailing: option === 'trailing' });

    return this.manager.addEventListener(element, this.unwrapEventName(eventName), debouncedHandler);
  }
}
