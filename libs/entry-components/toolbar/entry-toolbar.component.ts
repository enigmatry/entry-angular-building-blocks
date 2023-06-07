import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Toolbar component (`<entry-toolbar>`) is used to render header section in the applications containing menu items as a content.
 * It offers build in support for toolbar title or logo, while other elements need to be provided via content projection.
 * On smaller screens (mobile/tablet) it switches to compact view containing menu icon button used to toggle content visibility.
 *
 * @example
 * ```html
 * <entry-toolbar
 *    titleUri="http://www.enigmatry.com"
 *    titleLogoSrc="assets/enigmatry-logo.png">
 *    <!-- SOME CUSTOM HTML CODE THAT RENDERS MENU ITEMS -->
 * </entry-toolbar>
 * ```
 */
@Component({
  selector: 'entry-toolbar',
  templateUrl: './entry-toolbar.component.html',
  styleUrls: ['./entry-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryToolbarComponent {
  /** Toolbar title positioned in the left side */
  @Input() title: string;
  /** Url to be redirected to if user click on the title (default value '/') */
  @Input() titleUri = '/';
  /** If provided, it replaces string title and renders logo image instead */
  @Input() titleLogoSrc: string | undefined = undefined;
  /** Used to hide the title section if not required (default value false) */
  @Input() hideTitle = false;

  menuOpened = false;
}
