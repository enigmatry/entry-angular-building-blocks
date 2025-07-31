import { EventManager } from '@angular/platform-browser';

/**
 * abstract class EventManagerPlugin will be exposed in the public api
 * https://github.com/angular/angular/pull/49969
 *
 * Until then creating it from reference
 * https://github.com/angular/angular/blob/main/packages/platform-browser/src/dom/events/event_manager.ts#L93
 *
 * How to create custom event modifiers
 * https://github.com/Tinkoff/ng-event-plugins,
 * https://github.com/angular/angular/blob/main/packages/platform-browser/src/dom/events/key_events.ts
 * https://netbasal.com/lifting-the-veil-insights-into-angulars-eventmanagerplugin-ed9d14cbb31a
 */
export abstract class EventManagerPlugin {
  // Using non-null assertion because it's set by EventManager's constructor
  manager!: EventManager;

  /** Should return `true` for every event name that should be supported by this plugin */
  abstract supports(eventName: string): boolean;

  /**
   * Registers a handler for a specific element and event.
   *
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns  A callback function that can be used to remove the handler.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  abstract addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
}