import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  templateUrl: './entry-toolbar.component.html',
  styleUrls: ['./entry-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryToolbarComponent {
  /** Optional parameter used to supply logo image on toolbar's left side */
  @Input() logo?: string | undefined;
}
