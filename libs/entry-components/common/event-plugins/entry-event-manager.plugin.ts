import { EventManagerPlugin } from './event-manager.plugin';

/**
 * Entry event plugin base class
 */
export abstract class EntryEventManagerPlugin extends EventManagerPlugin {
  abstract modifier: string;

  /** return `true` for every event name that has specified modifier */
  supports(eventName: string): boolean {
    return eventName.includes(this.modifier);
  }

  /** unwrap params e.g. (click.debounce.500) => ['debounce', 500] */
  unwrapParams(eventName: string): string[] {
    return eventName
      .substring(eventName.indexOf(this.modifier))
      .split('.')
      .filter(x => !!x);
  }

  /** get event name e.g. (click.debounce.500) => click */
  unwrapEventName(eventName: string): string {
    return eventName.substring(0, eventName.indexOf(this.modifier));
  }
}
