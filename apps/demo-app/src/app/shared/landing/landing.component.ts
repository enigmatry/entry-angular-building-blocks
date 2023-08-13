import { Component, OnInit } from '@angular/core';
import { IComponentDefinition, COMPONENT_DEFINITIONS } from '../../features/component-definitions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  menuItems = COMPONENT_DEFINITIONS;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  redirect = (item: IComponentDefinition) => {
    this._router.navigate([item.route], { relativeTo: this._activatedRoute });
  };

  share = (item: IComponentDefinition) => {
    this._snackBar.open(`Link copied to the clipboard!`);
    this._clipboard.copy(`${location.href}${item.route}`);
  };
}
