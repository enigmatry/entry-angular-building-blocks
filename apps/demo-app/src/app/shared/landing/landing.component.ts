import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
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

  private readonly _router: Router = inject(Router);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _clipboard: Clipboard = inject(Clipboard);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  redirect = async(item: IComponentDefinition) => {
    await this._router.navigate([item.route], { relativeTo: this._activatedRoute });
  };

  share = (item: IComponentDefinition) => {
    this._snackBar.open(`Link copied to the clipboard!`);
    this._clipboard.copy(`${location.href}${item.route}`);
  };
}
