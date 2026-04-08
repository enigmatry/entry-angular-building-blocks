import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from './features/component-definitions';
import { SortPipe } from './shared/pipes/sort.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    SortPipe
  ]
})
export class AppComponent {
  readonly menuItems = COMPONENT_DEFINITIONS;
  private readonly router = inject(Router);

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
  );

  readonly selectedMenuItem = computed((): IComponentDefinition | undefined => {
    const event = this.navigationEnd();
    if (!event) {
      return undefined;
    }
    return this.menuItems.find(item => event.url.includes(item.route));
  });
}
