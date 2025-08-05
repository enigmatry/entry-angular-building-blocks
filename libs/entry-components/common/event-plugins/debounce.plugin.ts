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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  addEventListener(element: HTMLElement, eventName: string, originalHandler: Function): Function {
    // e.g. (click.debounce.500)
    const [_modifier, milliseconds = 500, option = 'leading'] = this.unwrapParams(eventName);

    // run original handler inside ngZone in which the event occurred
    const innerHandler = (event: any) => this.manager.getZone().runGuarded(() => originalHandler(event));

    // create debounced handler
    const debouncedHandler = debounce(innerHandler, milliseconds as number,
      { leading: option === 'leading', trailing: option === 'trailing' });

    // register event with debounced handler
    return this.manager.addEventListener(element, this.unwrapEventName(eventName), debouncedHandler);
  }
}
