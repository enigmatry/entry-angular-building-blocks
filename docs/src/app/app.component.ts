import { Component, OnInit } from '@angular/core';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from './shared/models/component-definitions';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuItems = COMPONENT_DEFINITIONS;
  selectedMenuItem: IComponentDefinition | undefined = undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const items = this.menuItems.filter(item => event.url.includes(item.route));
        this.selectedMenuItem = items ? items[0] : undefined;
      });
  }
}
