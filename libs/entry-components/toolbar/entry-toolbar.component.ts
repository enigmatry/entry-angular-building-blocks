import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Used to render basic toolbar that supports multi-slot content projection.
 *
 * @example
 * ```html
 * <entry-toolbar>
 *    <ima left-side src="asses/logo.png"/>
 *    <p>Here we could put any html, menu for example ...</p>
 *    <user-menu right-side></user-menu>
 * </entry-toolbar>
 * ```
 *
 * Main content projection (no selector) positions the elements in the central frame of the toolbar.
 * Along with this one, `left-side` and `right-side` selectors can be used to project content
 * to the left or to the right side of the central content.
 */
@Component({
  selector: 'entry-toolbar',
  templateUrl: './entry-toolbar.component.html',
  styleUrls: ['./entry-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryToolbarComponent {
}
