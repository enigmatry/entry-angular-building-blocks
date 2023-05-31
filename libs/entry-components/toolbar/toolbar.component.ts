import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/**
 * Used to render basic toolbar that supports content projection.
 *
 * @example
 * ```html
 * <entry-toolbar>
 *  <p>Here we could put any html, menu for example ...</p>
 * </entry-toolbar>
 * ```
 */
@Component({
  selector: 'entry-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
