import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from '../../features/component-definitions';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    standalone: false
})
export class LandingComponent {
  menuItems = COMPONENT_DEFINITIONS;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar) { }

  redirect = (item: IComponentDefinition) => {
    this._router.navigate([item.route], { relativeTo: this._activatedRoute });
  };

  share = (item: IComponentDefinition) => {
    this._snackBar.open(`Link copied to the clipboard!`);
    this._clipboard.copy(`${location.href}${item.route}`);
  };
}
