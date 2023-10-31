import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-plugin-example',
  templateUrl: './event-plugin-example.component.html'
})
export class EventPluginExampleComponent {

  @ViewChild('events', { static: true }) events: ElementRef<HTMLTextAreaElement>;

  @HostListener('window:resize.throttle')
  onWindowResize() {
    this.log('window:resize');
  }

  log(eventName: string) {
    this.events.nativeElement.value += `\n${eventName}`;
  }
}
